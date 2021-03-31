import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Account } from '../entities/Account';
import { isAuth } from '../middleware/isAuth';

@Resolver(Account)
export class AccountResolver {

    @Query(() => [Account])
    @UseMiddleware(isAuth) // 🛡
    accounts(): Promise<Account[]> {
        // ------------------------
        const qb = getConnection()
            .getRepository(Account)
            .createQueryBuilder("a")
            .orderBy("a.accountName", "ASC");
        return qb.getMany();
    }

}