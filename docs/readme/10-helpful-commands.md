## ⚙️ Helpful Commands

```sh
# you can skip CICD GitHub Actions by adding [skip ci] anywhere in your commit message, i.e.:
git add -A && git commit -m "[skip ci] feat: README touchups" && git push

# automatically generate code based on GraphQL schema and documents
yarn generate

# build production front-end bundle
yarn nx run multi-cart:build --prod


# ------------------ misc. nx schematics commands used (NOTE: dry runs) ---------------

# create a new nx workspace (with a Next.js main project)
npx create-nx-workspace@latest multi-cart --preset=next

# generate an nx react library
yarn nx generate @nrwl/react:lib react-shared-components --style=scss

# generate an nx agnostic library
yarn nx g @nrwl/workspace:lib util --pascalCaseFiles --dry-run

# generate a Next.js page
yarn nx g @nrwl/next:page --name=id --project=multi-cart  --directory=shop --dry-run

# generate a React component (react-ui)
yarn nx g @nrwl/react:component --name=FullScreenSpinner --project=react-ui --style=scss --export --pascalCaseFiles --dry-run

# or (react-shared-components)
yarn nx g @nrwl/react:component --name=DeleteLineAccountButton --export --project=react-shared-components --style=scss --pascalCaseFiles --directory=lib/line-account  --dry-run

# only run e2e tests for current changes
yarn nx affected:e2e

# only run affected tests or only lint affected projects
yarn nx affected --target=lint
yarn nx affected --target=test

# removing a workspace or node project
yarn nx g @nrwl/workspace:remove multi-cart-util --dry-run
yarn nx g @nrwl/node:remove multi-cart-api --dry-run


# ------------------ upgrading nx ------------------ 
# 1) upgrade everything (this doesn't install new libraries yet...)
yarn nx migrate latest

# 2) manually inspect packages.json diffs and make sure you are ok with them (edit them if not)

# 3) install new libraries
yarn

# ATTENTION: if CICD commands are using --frozen-lockfile, you may need instead: yarn upgrade

# 4) update the nx repo with these migrations
yarn nx migrate --run-migrations=migrations.json
```

