🔴 🔴 🔴 🔴 🔴 
🔴 Needs nx updating
🔴 🔴 🔴 🔴 🔴 



NOTE: these instructions are incomplete and do not include package and database installation steps, amongst other things...

# Quick Start

```sh
# start the typescript compiler (🟡 in one terminal window)
yarn watch
```

```sh
# start the server locally (🟡 in another terminal window)
yarn dev
```

# GraphQL Playground

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to open the **GraphQL Playground** in the browser.



# Running Tests

First, setup the test DB:
```sh
# change username 🟡
createdb multi-cart-test -U multi-cart-db-user

# NOTE: you DO NOT need the server nor `yarn watch` running for tests to work!

# run tests
yarn test

```