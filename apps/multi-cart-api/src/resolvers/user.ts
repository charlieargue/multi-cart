import * as argon2 from 'argon2';
import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { COOKIENAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { sendEmail } from '../utils/sendEmail';
import { validateRegister } from '@multi-cart/util';
import { User, UserResponse, UsernamePasswordInput } from '@multi-cart/api-types';

@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() { req }: MyContext) {
        // this is the currently-logged-in user so OK to show them their own email!
        if (req.session.userId === user.id) {
            return user.email;
        }
        // NOT OK: current user wants to see someone else's email!
        return "";
    }

    @Query(() => User, { nullable: true })
    me(
        @Ctx() { req }: MyContext
    ) {
        // 🟥 you are NOT logged in!
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {

        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashedPassword = await argon2.hash(options.password);

        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: options.username,
                    email: options.email,
                    password: hashedPassword
                })
                .returning("*")
                .execute();

            user = result.raw[0];

        } catch (err) {
            console.log("🚀 ~ err", err);
            if (err.code === "23505" || err.detail.includes("already exists")) {
                return {
                    errors: [{
                        field: "username",
                        message: "username has already been taken"
                    }]
                };
            }
        }

        // 🟢 You are logged in! (store user id in session, setting a cookie, keeping them logged in...)
        req.session.userId = user.id;

        return { user };
        // ✅ graphql will NOT return the .password field, FYI
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where:
                usernameOrEmail.includes("@") ?
                    { email: usernameOrEmail } :
                    { username: usernameOrEmail }
        });
        if (!user) {
            return {
                errors: [{
                    field: "usernameOrEmail",
                    message: "that usernameOrEmail doesn't exist"
                }],
            }
        }

        const valid = await argon2.verify((user as User).password, password);
        if (!valid) {
            return {
                errors: [{
                    field: "password",
                    message: "incorrect password"
                }]
            }
        }

        // 🟢 You are logged in!
        req.session.userId = user.id; // can be object, etc... more data in there, ...
        return {
            user
        } as const;
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // email is not in DB
            //... 🛡 but for security reasons...
            //    🛡 maybe just return true so they can't sniff for emails and PHISH!
            return true; // or false... do nothing
        }

        // TODO: RIP out old redis library and just need io-redis?
        const token = v4(); // guid

        // use redis to store these tokens
        await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3); // 3 days validity

        // send them a special LINK w/ token
        await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
        );
        return true;
    }

    // NOTE: this also logs-in the user
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { req, redis }: MyContext
    ): Promise<UserResponse> {
        // validate new password
        if (newPassword.length <= 3) {
            return {
                errors: [{
                    field: "newPassword",
                    message: "length must be greater than 3"
                }]
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key)
        if (!userId) {
            return {
                errors: [{
                    field: "token",
                    message: "token expired"
                }]
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);
        if (!user) {
            return {
                errors: [{
                    field: "token",
                    message: "user no longer exists"
                }]
            };
        }
        const hashedNewPassword = await argon2.hash(newPassword);
        try {
            await User.update({ id: userIdNum }, { password: hashedNewPassword });
        } catch (err) {
            console.log("🚀 ~ err", err)
            return {
                errors: [{
                    field: "token",
                    message: "unknown server error"
                }]
            };
        }

        // remove that token from redis so can't use it again
        await redis.del(key);

        // login user after change password
        req.session.userId = user.id;

        return {
            user
        };
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res }: MyContext
    ): Promise<boolean> {
        return new Promise(resolve =>
            req.session.destroy(err => {
                res.clearCookie(COOKIENAME);
                if (err) {
                    console.log("🚀 ~ err", err)
                    resolve(false);
                    return;
                }
                resolve(true);
            })).then(() => true);
    }


    // TODO: make an input type!
    // TODO: do we not want a more generic UpdateUser at this point? yes, because this will be for all non-secure user.fields
    //       and we want to pass in a UserInput object!
    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async updateUser(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        @Arg("currentCartId", () => Int!) currentCartId: number,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {

        // TODO: validate that this is a valid cart? and that he owns/created this cart!
        // can only update himself!
        const result = await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ currentCartId })
            .where('id = :id', {
                id: req.session.userId,
            })
            .returning("*")
            .execute();

        return {
            user: result.raw[0]
        };
    }

}