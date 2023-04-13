🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴
🔴 NEEDS UPDATING after nx
🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴



🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

# Quick Start:

To start the front-end, as well as the mocked API, run:

```bash
yarn dev
```

To generate graphql code, i.e. after updating either:

- `src/api/schema.graphql`, or
- `src/graphql/*`

```bash
yarn dev
```

# URLs

## Front-End

- http://localhost:3000/

## MOCKED GRAPHQL PLAYGROUND

Mocked back-end: (note: mocked API is currently disabled, and schema is loaded from the Postgre BE)

- http://localhost:3000/api/graphql

# To run E2E tests:

Ensure the FE/BE are running, and in a new terminal window, run:

```bash
yarn e2e:open
```

And then click the page you want to test, or click "run integration spec" to run all tests.
