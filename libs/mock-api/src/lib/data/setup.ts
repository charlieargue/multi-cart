import { carts } from '../data/mocked-carts';
import { users } from '../data/mocked-users';
import { accounts } from '../data/mocked-accounts';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Cart, User, Account } from '@multi-cart/react-data-access';

const db = new JsonDB(new Config("./libs/mock-api/mock-database", true, false, '/'));

// hydrate data
const hydrateData = () => {

    // only hydrate if database is empty, otherwise leave it alone
    const numberOfCarts = db.count("/carts");
    const numberOfUsers = db.count("/users");
    const numberOfAccounts = db.count("/accounts");

    if ([numberOfAccounts, numberOfCarts, numberOfUsers].every(n => n === 0)) {
        console.log(`🚀 ~ HYDRATING MOCK DATA 🔴 💎 🔴 💎 🔴 💎 🔴 💎 🔴 💎 `);

        // push up mocked data into our mock json database
        carts.forEach((cart: Cart, index) => {
            if (index === 0) {
                // this will initialize the array
                db.push("/carts[0]", cart, true);
            } else {
                // this will append to the initialized array
                db.push("/carts[]", cart, true);
            }
        });

        users.forEach((user: User, index) => {
            if (index === 0) {
                db.push("/users[0]", user, true);
            } else {
                db.push("/users[]", user, true);
            }
        });

        accounts.forEach((account: Account, index) => {
            if (index === 0) {
                db.push("/accounts[0]", account, true);
            } else {
                db.push("/accounts[]", account, true);
            }
        });

    } else {
        console.log(`🚀 ~ vee proceed ✅ 😀 ✅ 😀 ✅ 😀 ✅ 😀 ✅ 😀  `);
    }

};


export {
    hydrateData,
    db
};