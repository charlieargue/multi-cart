import { carts } from '../data/mocked-carts';
import { users } from '../data/mocked-users';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Cart, User } from '@multi-cart/react-data-access';

const db = new JsonDB(new Config("./mock-database", true, false, '/'));

// hydrate data
const hydrateData = (): void => {

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
};


export {
    hydrateData,
    db
};