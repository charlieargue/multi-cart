import { createConnection } from "typeorm";

const testConn = (drop = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "multi-cart-db-user",
        password: "666",
        database: "multi-cart-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../../entities/*.*"],
        logging: false
    });

};
export default testConn;