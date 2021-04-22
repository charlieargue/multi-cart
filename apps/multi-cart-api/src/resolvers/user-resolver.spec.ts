import faker from 'faker';
import { Connection } from "typeorm";
import { Cart, User } from "@multi-cart/api-types";
import { gCall } from "../test/test-utils/gCall";
import { setupTestData } from "../test/test-utils/setupTestData";
import testConn from "../test/test-utils/testConn";


export let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    if (conn) {
        await conn.close();
    }
});

// TODO: pull these from @api-types, or...
const updateUserMutation = `
mutation UpdateUser($currentCartId: Int!) {
    updateUser(currentCartId: $currentCartId) {
      user {
          id
          email
          username
          currentCartId
      }
    }
  }
  
`;

const meUserQuery = `
query Me {
    me {
        id
        email
        username
        currentCartId
    }
  }
  `;

  // TODO: nx this, or moot since serverless?
const registerMutation = `
mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
        user {
            id
            username
            email
            currentCartId
        }
    }
  }
  `;

// ------------------------
// ------------------------
// ------------------------
// thx: https://medium.com/@christianhettlage/graphql-and-authentication-d752fcfdd528
// BEN: https://youtu.be/zR8jKR9hnFA?t=494
describe('User Tests', () => {


    // ------------------------
    it('ME: should return an error if user is not logged in', async () => {
        const result = await gCall({ source: meUserQuery })
        await expect(result.data?.errors).not.toEqual(null);
        await expect(result).toMatchObject({
            data: {
                me: null
            }
        });
    });

    // ------------------------
    it('ME: should return user if user is logged in', async () => {
        const { testUser }: { testUser: User } = await setupTestData();
        const result = await gCall({ source: meUserQuery, userId: testUser.id })
        await expect(result).toMatchObject({
            data: {
                me: {
                    id: testUser.id,
                    username: testUser.username,
                    email: testUser.email,
                    currentCartId: testUser.currentCartId,
                }
            }
        });
    });

    // ------------------------
    it('REGISTER: can register a new user', async () => {

        const newUser = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        const result = await gCall({
            source: registerMutation,
            variableValues: {
                options: newUser
            },
        });
        await expect(result.data?.errors).not.toEqual(null);
        await expect(result).toMatchObject(
            {
                "data": {
                    "register": {
                        "user": {
                            "id": result.data?.register.user.id,
                            "username": newUser.username,
                            "email": newUser.email,
                            "currentCartId": null
                        }
                    }
                }
            });
    });

    // ------------------------
    it('UPDATEUSER: Can change current cart id', async () => {
        const { testUser, testCart }: { testUser: User, testCart: Cart } = await setupTestData();
        // console.log("🚀 ~ testUser", testUser)
        await expect(testUser.currentCartId).toEqual(null);
        const result = await gCall({
            source: updateUserMutation,
            variableValues: {
                currentCartId: testCart.id
            },
            userId: testUser.id
        });
        await expect(result).toMatchObject({
            "data": {
                "updateUser": {
                    "user": {
                        "id": testUser.id,
                        "email": testUser.email,
                        "username": testUser.username,
                        "currentCartId": testCart.id
                    }
                }
            }
        });
    });



});

