🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴
🔴 NEEDS UPDATING after nx
🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

`package.json` scripts:

```json
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "gen": "graphql-codegen --config codegen.yml",
    "debug": "NODE_OPTIONS='--inspect' next dev",
    "e2e:open": "cypress open",
    "e2e:cicd": "cypress run",
    "e2e:run:chrome": "cypress run",
    "e2e:run:firefox": "cypress run  --browser firefox",
    "e2e:run:edge": "cypress run  --browser edge"
```

🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

❓ And where does this go???

```json
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 2 safari version",
      "ie 11"
    ]
  }
```

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
