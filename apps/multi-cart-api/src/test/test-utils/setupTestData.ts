import faker from "faker";
import { Cart } from "../../entities/Cart";
import { User } from "../../entities/User";
// import { Connection } from "typeorm";

export async function setupTestData() {

    // insert test user
    await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '$argon2i$v=19$m=4096,t=3,p=1$Lv4YzmsvcazXQ2BnvzLdZQ$4M3xWC38D7tB8Yn3aTY8gR8kLsXEBGscAjfTg4zJ4tQ',
        // pwd = dupa or pupa
    }).save();
    
    // checking created successfully
    const testUser = (await User.find({}))[0];

    // insert test cart for that user
    const testCart = await Cart.create({
        name: "Test Cart",
        userId: testUser.id
    }).save();

    return { testUser, testCart };
}
