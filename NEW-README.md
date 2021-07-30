# 🛍 Multi-Cart — a fake fancy shopping cart

![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/feature-promotion.yml/badge.svg)

This is a demo full-stack serverless web application (built for self-study purposes) that is very nearly production-ready and enterprise-grade, can be used as a starter project, includes robust testing, CICD, shared libraries between the FE & BE, and is team-ready.

It is built with:

* **React**
* **GraphQL**
* **Terraform** + **AppSync**
* and other tech...





# Demo

![multi-cart-overview](https://github.com/charlieargue/readme-assets/blob/main/multi-cart/Multi-Cart-trimmed-xs-TEMP.gif?raw=true)





# Purpose 

This was built for purposes of `self-study as I was upskilling` from angular & node/REST APIs **to React**, and I incrementally changed the GraphQL backends along the way, namely:

* first **react** & <u>PostgreSQL+TypeOrm+TypeGraphQL</u> (after diligently going thru [Ben Awad's 14-hour Full-Stack React Course](https://www.youtube.com/watch?v=I6ypD7qv3Z8))
* then **react** & a <u>mocked</u> GraphQL backend (for rapid UI development, using Next.js' public api pages)
* and finally **react** & a <u>serverless</u> backend (with Terraform+AppSync+DynamoDB+Cognito)

In addition to building the app, I also strove to include the latest web development **best practices and tools**, that I had been wanting to learn and use for a long time, such as using:

- React (urql, formik, redux, Context, etc.)
- nx mono-repo (shared libraries)
- Chakra-UI
- Storybook
- Jest
- Cypress
- Next.js
- Terraform
- AWS (AppSync, Cognito, DynamoDB, etc.)
- etc.

I also did my best to keep things as **Production-ready** as I could, for instance with multiple environments and safe secrets management, as well as keeping the project **Team-ready** as well, so that other contributors could jump right in and pitch in development into the CICD workflows. 

I designed the **CICD** workflows to make full use of my testing pyramid -- i.e. not merging PRs if tests fail, and keeping things as automated as possible. There's definitely room for improvement, see the CICD section below details, but it all works fine as-is and does not take too long (dozens of e2e tests running in parallel complete in a couple minutes, the entire pipeline taking less than 20 minutes).

Additionally, I tried to leverage **cloud** and  **"Cloud-Native"** technologies as much as possible, for example:

* using Terraform Cloud, Cypress Dashboard, GitHub Actions, and Vercel

* choosing AWS "Cloud Native" **VTL** template resolvers over Lambdas wherever possible

  * > to minimize cold start and latency due to network I/O for resolver invocation...

Finally, one of my primary goals was to basically build a **enterprise-grade starter boilerplate** that I could use on future projects, that was also **scalable**. Using Terraform, AppSync, DynamoDB, and Cognito allow for that. Cognito apparently can handle millions of users for authentication out-of-the-gate with minimal adjustment. With DynamoDB, you would need to add some `autoscaling` configurations, and so forth.  On the front-end, the Vercel Edge Network handles most of that for us.

Keep in mind this is a **work-in-progress**, many things are mocked (like Products and the dashboard), and incomplete (like UOMs and Categories). Caveats, limitations, and issues are detailed below.

This was **inspired by** the many shopping cart and e-commerce projects I have worked on in the past, and is a loose conglomeration of some of them.

*NOTE: I built this in approx. 4 months at the beginning of 2021, you can see all my GIT commits for more info.*





# How to install

You will need `yarn` and `node` installed on your machine for this to work:

```sh
# clone the repo
git clone https://github.com/charlieargue/multi-cart

# change directory 
cd multi-cart

# install libraries (this can take a few minutes)
yarn
```





# Quick Start

**1. Setup environment variables**

In order to run the front-end locally, you'll need a `.env.local` environment variable file in the `apps/multi-cart/` directory:

```sh
# copy env file (this assumes you are in the root multi-cart directory)
cp apps/multi-cart/.env.dist apps/multi-cart/.env.local
```

Edit `apps/multi-cart/.env.local` to have these two keys (you can ignore the other ones):

```
NEXT_PUBLIC_API_URL=https://pcuynwb3tfbbzjfygrljfoej3q.appsync-api.us-west-2.amazonaws.com/graphql
NEXT_PUBLIC_API_KEY=da2-zrexcuvmlvhj3oxbzp3nby7ipq
```

**2. Start the front-end**

Then you can start the local web development server and fire up the front-end with:

```sh
yarn start		
```

You can view the site at:

* http://localhost:4200/





# Project Overview

This nx monorepo contains the following projects (screenshot taken of [nx console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)), in a flattened view:

<img src="https://raw.githubusercontent.com/charlieargue/readme-assets/main/multi-cart/project-overview-all.png" alt="image-20210729162309390" style="zoom:70%;" />



`nx FYI`: Projects cannot be referenced, but **Libraries** can be referenced by other Libraries or Projects.



### **MAIN PROJECTS** `/apps`

* **multi-cart**: main Next.js web application
* **multi-cart-e2e**: Cypress e2e integration tests for main web app
* **react-shared-components-e2e**: Cypress e2e UI unit tests for shared-components library
* **react-ui-e2e**: Cypress e2e UI unit tests for the basic design system library



### **LIBRARIES** `/libs`

* **mock-api**: a mocked GraphQL API (via Next.js' pages) that I used to quickly build up my front-end UI
  * `NOTE`: would need some slight updating to work again, since originally was mocked up based on a PostgreSQL back-end, and then I switched to DynamoDB and AppSync, and never updated the mocked API accordingly, so there will be a mix up of GUID vs Integer primary keys used, etc.)
* **multi-cart-iac**: all the back-end Infrastructure-as-Code (IAC) "code" for AWS (the only cloud provider used) lives here, namely: 
  * my Terraform modules and configuration
  * all the AppSync pipeline functions, lambdas, resolvers, and mapping templates (`.VTL`)
  * the GraphQL schema
  * as well as all the necessary roles and policies
  * `NOTE`: this was created as a nx library and not a main project because the GraphQL schema needs to be referenced by other projects & libraries
* **multi-cart-iac-tests**: this project can mostly be ignored, I was using this to run my Postman tests locally via Newman, and back-up Postman configs/tests as I was deciding whether or not I could use Postman+Newman for testing both locally and in CICD (I can!)
* **react-app-state**: Redux application state lives here, including actions, reducers, and the store itself. I made this an agnostic nx library because I needed to access app state outside of the React ecosystem, namely during the urql global fetching exchange (part of the react-data-access library)
* **react-data-access**: this project holds all the automatically-generated code from GraphQL Code Generator (strongly-typed custom mutation/query hooks, etc.); 
  * it also contains all the GraphQL **documents** for fragments, input types, and queries/mutations used by the front-end (and which power the code generator) 
  * urql customizations also live here
  * this library is referenced by both the main multi-cart project, the mock-api project, and by other libraries
* **react-shared-components**: these are "medium-level" components built upon the "low-level" design system (react-ui) that are then used in the main multi-cart web application
  * this library also contains the main site layout, custom hooks, and styles
  * Storybook stories are included with each component that is being tested
* **react-ui**: a "low-level" design system that is very basic, built on top of and using Chakra-UI, with Storybook stories
* **util**: a shared library with pure Typescript and JSX utility functions, with Jest unit tests



### **NX DEPENDENCY GRAPH**

Output from the `nx dep-graph` command:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/project-overview-depgraph.png?raw=true" alt="nx dep-graph" style="zoom:70%;" />





# Testing

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-pyramid.png?raw=true" alt="testing-pyramid" style="zoom:70%;" />



I tried to follow the principles of a [Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#:~:text=The%20%22Test%20Pyramid%22%20is%20a,put%20it%20into%20practice%20properly.) as closely as I could, and hence there are three types/layers of tests for this app:

1. **UI & Integration Tests**: these tests require the most integration and are the slowest; they include only the Cypress E2E from the multi-cart-e2e project
2. **Service Tests**: These are Postman tests that exercise the AppSync GraphQL API endpoints
3. **Unit Tests**: these are the fastest, require the least integration, and include both pure Jest unit tests as well as UI unit tests (Cypress exercising Storybook stories); this would be the place to (in the future) include some kind of visual regression tests

*NOTE:* these tests can be run both locally, or in CICD workflows. The commands to run them locally are listed below.



### Jest Unit Tests 

```shell
# ⚡️ run JEST unit tests against utility library 
yarn nx run util:test
```

Results should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-jest.png?raw=true" alt="testing-jest" />



### UI Unit Tests 

```shell
# ⚡️ UI unit tests (against 2 UI libraries)

# react-ui STORYBOOK and CYPRESS specs against those stories
# ⚠️ run the 2nd command in a separate terminal window!
yarn nx run react-ui:storybook
yarn nx run react-ui-e2e:e2e-local                 


# react-shared-components STORYBOOK and CYPRESS specs against those stories
# ⚠️ run the 2nd command in a separate terminal window!
yarn nx run react-shared-components:storybook
yarn nx run react-shared-components-e2e:e2e-local  

# FYI: nx can combine these two commands for you easily, I just chose to have them separated out
```



So for example, the `react-ui` **Storybook** should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/storybook-react-ui.png?raw=true" alt="storybook-react-ui" />



And the `react-shared-components` **Storybook** should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/storybook-shared-cmpnts-sm.png?raw=true" alt="storybook-shared-cmpnts.png" />



And when running the Cypress specs against those stories, it should look something like this:

- 🎦 https://www.loom.com/share/bdf725f3aae04b52af7936cb85cf02c4 (react-shared-components)



### Service Tests

```sh
# ⚡️ run POSTMAN service tests against DEV API (via Newman and my Postman Collection of tests)
yarn test-iac
```

These were first created in **Postman**, and then can be run locally or in CICD workflows via **Newman**. Your local output should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-postman.png?raw=true" alt="testing-postman" style="zoom:50%;" />



### UI & Integration Tests

```sh
# you'll need to startup the front-end first:
yarn start

# ⚡️ run CYPRESS tests for multi-cart front-end locally
yarn nx run multi-cart-e2e:e2e-local           # ⚠️ in a separate terminal window
```

Which should look something like this:

- 🎦 https://www.loom.com/share/465f5b69c7724ffd94574566d2fa2a46
  - *NOTE: my network is a little sluggish in this video, things don't usually lag or take this long, but it does allow for a good showcase of my use of skeletons and loading artifacts :)*



### 















[ ] I'm imagiing one SECTION [like this](https://github.com/charlieargue/clickup-july-table#testing) for each of the pyramid LAYERS

Storybook & Cypress UI Unit Testing:

- [ ] screenshots from local successful runs (both SB alone and in cypress)
- [ ] looms of running?
- [ ] cypress dashboard screenshots

Postman:

- local
- in CICD
- a loom 

Jest, ditto





# CICD

[ ] 🔥 Show CICD workflows diagram (update it plz!)

[ ] explain need to move KEYS up into TF Cloud,  

[ ] explain TF notification -> GHA webhook

[ ] screen shots from successful GHA



# Serverless (Terraform Cloud & AWS):

[ ] explain that remote execution, so need to setup TF CLoud, env vars, etc... (screen shots, or NO, SKIP ALL THAT< not the point here?!) just broadly, show settings screenshots quickly, it's easy maybe, ok?)

[ ] explain that only DEV and PROD envs (no local, never tf plan/apply locally, etc... remote state)



# Typical Development Workflow

A. making FE change

B. makeing BE change





# Caveats/Issues

### 🔴 CURRENT KNOWN ISSUES:
- you will need AWS credentials installed globally
- I'm still using ROOT USER instead of a sub-AWS-user, WIP
-  (not responsive or mobile-first design at this stage),
- etc... see my GOOGLE DOC list





# Other helpful Commands



# List of VS Code Extensions

🔴 TODO: filter/prune this down!

```js 
code --install-extension 4ops.terraform
code --install-extension adamvoss.vscode-languagetool
code --install-extension ahmadalli.vscode-nginx-conf
code --install-extension AlDuncanson.react-hooks-snippets
code --install-extension alefragnani.Bookmarks
code --install-extension bodil.prettier-toml
code --install-extension bungcip.better-toml
code --install-extension ChakrounAnas.turbo-console-log
code --install-extension coddx.coddx-alpha
code --install-extension CoenraadS.bracket-pair-colorizer-2
code --install-extension cymonk.sql-formatter
code --install-extension daylerees.rainglow
code --install-extension dbaeumer.vscode-eslint
code --install-extension donjayamanne.githistory
code --install-extension DotJoshJohnson.xml
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension dweber019.vscode-style-formatter
code --install-extension eg2.tslint
code --install-extension erd0s.terraform-autocomplete
code --install-extension esbenp.prettier-vscode
code --install-extension firsttris.vscode-jest-runner
code --install-extension GraphQL.vscode-graphql
code --install-extension hangxingliu.vscode-nginx-conf-hint
code --install-extension hashicorp.terraform
code --install-extension HexcodeTechnologies.vscode-prettydiff
code --install-extension joekon.ssmacro
code --install-extension joffreykern.markdown-toc
code --install-extension kumar-harsh.graphql-for-vscode
code --install-extension lkytal.FlatUI
code --install-extension luqimin.velocity
code --install-extension lyzerk.linecounter
code --install-extension mgmcdermott.vscode-language-babel
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-mssql.mssql
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-vscode.Theme-1337
code --install-extension ms-vscode.Theme-TomorrowKit
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension nobuhito.printcode
code --install-extension nrwl.angular-console
code --install-extension Nuuf.theme-hackershaze
code --install-extension oouo-diogo-perdigao.docthis
code --install-extension paulmolluzzo.convert-css-in-js
code --install-extension pjmiravalle.terraform-advanced-syntax-highlighting
code --install-extension plibither8.remove-comments
code --install-extension QassimFarid.ejs-language-support
code --install-extension Quidgest.vscode-velocity
code --install-extension raynigon.nginx-formatter
code --install-extension redhat.vscode-commons
code --install-extension redhat.vscode-yaml
code --install-extension robole.markdown-snippets
code --install-extension run-at-scale.terraform-doc-snippets
code --install-extension sallar.json-to-js-object
code --install-extension Shan.code-settings-sync
code --install-extension sodatea.velocity
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension theBenForce.appsync-resolver-autocomplete
code --install-extension viablelab.capitalize
code --install-extension vscode-icons-team.vscode-icons
code --install-extension WallabyJs.quokka-vscode
code --install-extension whizkydee.material-palenight-theme
code --install-extension wholroyd.HCL
code --install-extension william-voyek.vscode-nginx
code --install-extension xabikos.JavaScriptSnippets
code --install-extension xabikos.ReactSnippets
code --install-extension yycalm.linecount
code --install-extension yzane.markdown-pdf
```



# License

(unknown, add MIT one or something?)

















## Setup database

To setup your PosgreSQL database, execute the following commands:
```sh

# install PosgreSQL (note doen the SA password you will be prompted to create)
brew install postgresql

# confirm installed correctly, check version:
postgres -V

# create a database user (🟡 change username):
createuser -P --superuser 🟡myusername🟡
# NOTE: you'll enter the same password THREE times

# make a database 🔴  (you will need to enter the USER PASSWORD)
createdb knowde-pos -U 🟡myusername🟡
```

## Update your ormconfig.json

✅ Make sure to also update the `username` and `password` fields in the `ormconfig.json` file!

## Start up the server

```sh
# start the typescript compiler (🟡 in one terminal window)
yarn watch
```

```sh
# start the server locally (🟡 in another terminal window)
yarn dev
```

