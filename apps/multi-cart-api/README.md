# Quick Start

```sh
# start the API
npm start multi-cart-api
```

# GraphQL Playground

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to open the **GraphQL Playground** in the browser.



# Running Tests

First, setup the test DB:
```sh
# change username 🟡
createdb multi-cart-test -U multi-cart-db-user

# NOTE: you DO NOT need the server nor `yarn watch` running for tests to work!

# ---- testing
npx nx run multi-cart-api:test

```

# Linting

```bash
# ---- linting
npx nx run multi-cart-api:lint

```