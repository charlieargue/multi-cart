# 🛍 Multi-Cart — a fake fancy shopping cart

![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/01-feature-promotion.yml/badge.svg) ![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/02-dev-promotion.yml/badge.svg)

[multicart.app](https://multicart.app/)

This is a full-stack **serverless** web application (built for demo & self-study purposes) that is very nearly production-ready and enterprise-grade, can be used as a starter project, includes robust testing, CICD, shared libraries between the FE & BE, and is team-ready.

It is built with:

* **React**
* **GraphQL**
* **Terraform** + **AppSync**
* and other tech...

It showcases the following functionality and features:

1. <u>User Authentication</u> (login, logout, register, forgot/change password)
2. Managing and editing multiple shopping <u>Carts</u>
3. Adding mocked products as cart line items, and associating multiple funding <u>Accounts</u> (by percentages) with each cart line

And:

​	✔️ <u>Public and private pages</u>, and support for hybrid static & server rendering

​	✔️ Both a <u>GraphQL</u> cloud-managed API as well as a REST API (just 1 page) -- and even a mocked GraphQL API

​	✔️ <u>Auto-generated</u> custom React useMutation hooks and types allowing for strong typing across the whole stack





## ▶️ Demo

![multi-cart-overview](https://github.com/charlieargue/readme-assets/blob/main/multi-cart/Multi-Cart-trimmed-xs-TEMP.gif?raw=true)





## 🎯 Purpose 

This was built for purposes of `self-study as I was upskilling` from angular & node/REST APIs **to React**, and I incrementally changed the GraphQL backends along the way, namely:

* first **react** & <u>PostgreSQL+TypeOrm+TypeGraphQL</u> (after diligently going thru [Ben Awad's 14-hour Full-Stack React Course](https://www.youtube.com/watch?v=I6ypD7qv3Z8))
* then **react** & a <u>mocked</u> GraphQL backend (for rapid UI development, using Next.js' public api pages)
* and finally **react** & a <u>serverless</u> backend (with Terraform+AppSync+DynamoDB+Cognito)

While building the app, I strove to include the latest web development **best practices and tools**, that I had been wanting to learn and use for a long time.

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





## 🚀 Technologies Used

- [React](https://reactjs.org/)
  - [react-icons](https://react-icons.github.io/react-icons/search)
  - [urql](https://formidable.com/open-source/urql/)
  - [Formik](https://formik.org/) / [yup](https://formik.org/docs/guides/validation)
  - [Redux](https://redux.js.org/)
- [Chakra-UI](https://chakra-ui.com/)
- sass / SCSS
- [husky](https://typicode.github.io/husky/#/)
- GraphQL
  - [GraphQL Code Generator](https://graphql-code-generator.com/)
- [Next.js](https://nextjs.org/)
- [nx monorepo](https://nx.dev/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Postman](https://www.postman.com/) / [Newman](https://github.com/postmanlabs/newman)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Terraform](https://www.terraform.io/)
- [VTL templates](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html)
- AWS services, such as:
  - [AppSync](https://aws.amazon.com/appsync/)
  - Amazon [Simple Email Service](https://aws.amazon.com/ses/)
  - [CloudWatch](https://aws.amazon.com/cloudwatch/)
  - [Cognito](https://aws.amazon.com/cognito/)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - [IAM](https://aws.amazon.com/iam/)
  - [Lambda](https://aws.amazon.com/lambda/)
- and various cloud services for **CICD** and devops:
  - [Vercel](https://vercel.com/)
  - [Terraform Cloud](https://www.terraform.io/cloud)
  - [GitHub Actions](https://github.com/features/actions)
  - [Cypress Dashboard](https://www.cypress.io/dashboard/)





## ✅ Requirements

Before starting 🏁, you need to have these installed on your machine:

* [Git](https://git-scm.com/) 
* [Node](https://nodejs.org/en/) 
* and [yarn](https://classic.yarnpkg.com/en/docs/install)  





## 👨🏻‍💻 How to install

```sh
# clone the repo
git clone https://github.com/charlieargue/multi-cart

# change directory 
cd multi-cart

# install libraries (this can take a few minutes)
yarn
```





## ⚡️ Quick Start

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





## 🗂 Project Overview

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





## 👩‍🔬 Testing

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-pyramid.png?raw=true" alt="testing-pyramid" style="zoom:70%;" />



I tried to follow the principles of a [Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#:~:text=The%20%22Test%20Pyramid%22%20is%20a,put%20it%20into%20practice%20properly.) as closely as I could, and hence there are three types/layers of tests for this app:

1. **UI & Integration Tests**: these tests require the most integration and are the slowest; they include only the Cypress E2E from the multi-cart-e2e project
2. **Service Tests**: These are Postman tests that exercise the AppSync GraphQL API endpoints
3. **Unit Tests**: these are the fastest, require the least integration, and include both pure Jest unit tests as well as UI unit tests (Cypress exercising Storybook stories); this would be the place to (in the future) include some kind of visual regression tests

*NOTE:* these tests can be run both locally, or in CICD workflows. The commands to run them locally are listed below.



### Jest Unit Tests 

```shell
# run JEST unit tests against utility library 
yarn nx run util:test
```

Results should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-jest.png?raw=true" alt="testing-jest" />



### UI Unit Tests 

```shell
# UI unit tests (against 2 UI libraries)

# react-ui STORYBOOK and CYPRESS specs against those stories
# run the 2nd command in a separate terminal window!
yarn nx run react-ui:storybook
yarn nx run react-ui-e2e:e2e-local                 


# react-shared-components STORYBOOK and CYPRESS specs against those stories
# run the 2nd command in a separate terminal window!
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
# run POSTMAN service tests against DEV API (via Newman and my Postman Collection of tests)
yarn test-iac
```

These were first created in **Postman**, and then can be run locally or in CICD workflows via **Newman**. Your local output should look something like this:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-postman-sm.png?raw=true" alt="testing-postman" style="zoom:50%;" />



### UI & Integration Tests

```sh
# you'll need to startup the front-end first:
yarn start

# run CYPRESS tests for multi-cart front-end locally
# and then in a separate terminal window
yarn nx run multi-cart-e2e:e2e-local           
```

Which should look something like this:

- 🎦 https://www.loom.com/share/465f5b69c7724ffd94574566d2fa2a46
- *NOTE: my network is a little sluggish in this video, things don't usually lag or take this long, but it does allow for a good showcase of my use of skeletons and loading spinners :)*





## ⛅️ CICD

The CICD workflows are composed of a few separate pieces:

* **GitHub action #1** triggered both by commits to any feature branches (`01-feature-promotion.yml`)
* **GitHub action #2** triggered by a repository dispatch event (which comes from `webhook-incoming.ts`)
* an **Incoming Webhook** on the multi-cart webiste (hosted thanks to Next.js' api pages)
* **Vercel**'s automatic builds and deployments 
* **Terraform Cloud**'s automatic planning and applying of configurations and <u>notifications</u>
* **Cypress Dashboard**'s <u>parallel testing</u> across multiple GitHub Action machines



### Workflow Illustration

This illustration tries to simplify and explain the workflow in its entirety:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/MultiCart-CICD-Workflows-Updated.png?raw=true" alt="MultiCart-CICD-Workflows-Updated" style="zoom:100%;" />



### Detailed Steps

In detailed steps, here's what happens when a developer makes a local commit to their feature branch:

(*In this case, I'm making changes to both FE and BE code*)

1. Files are linted locally, and then pushed up to the repo origin
2. That triggers **Vercel** to build and deploy a preview of my feature branch
3. Also triggered by Step #1, **GitHub Action #1**, starts 
   1. That GHA #1 will simultaneously run Jest Unit Tests and all the Cypress Storybook Tests, the latter being run in-parallel across multiple GitHub machines, with a little help from Cypress Dashboard
4. If all those complete without errors, a pull-request (PR) will be created and automatically merged, merging this feature branch with the **develop** branch
5. That merge triggers **Vercel** to build and deploy the **develop** branch
6. That merge also simultaneously triggers **Terraform Cloud** to run and apply configuration changes (hackily, see note ➰, it always runs, even if no BE changes were made)
7. Once applied, **Terraform Cloud** fires off a *Notification* to my custom incoming webhook (`webhook-incoming.ts`) which simply fires off a *Repository Dispatch* to my GitHub Action #2
8. **GHA #2** proceeds to simultaneously run the Service Tests (against the DEV API) and the Integration Cypress E2E tests (against the develop branch front-end)
9. If all those complete without errors, a PR will be created and automatically merge the develop branch with the **main** production branch
10. That triggers **Vercel** to build and deploy the **main** production branch
11. That merge simultaneously triggers **Terraform Cloud** to run and apply configuration changes to the **production** environment (but in this case, ONLY if there were any changes to the IAC code... this is a TF Cloud setting)



#### Additional Notes

The whole build and test and deployment process for both the FE and BE takes under 20 minutes, and needless to say has a lot of room for improvement (see caveats below). But for my purposes, as the sole developer of a server-less API that I could switch over to a mocked-API for rapid UI development ... this worked really, really well! And I image with a team of developers, who could at anytime do the same, this would work very well also -- of course with some additional changes and upgrades.



**Hacky/Bad Implementations:**

- **➰** The DEV Terraform Cloud runs always detect lambda archive changes even when there are none, and so at the moment, even if no back-end IAC changes are made, Terraform Cloud will plan & apply the same series of un-expected changes (mostly because of lambda archive hashes changing). Because of that, I always count on that Apply event and have a TF Cloud Notification wired up kick-off the next GitHub action.



**Other Implementation Notes:**

* The main reasoning for the overly-complicated `TFNotification->MyWebhook->GitHubAction` approach, was to run the Postman API tests **against a freshly-applied DEV Terraform back-end**! So I needed to wait until Terraform was done before running the next GitHub Action.
* I think a better CICD workflow approach is to have two separate "channels" of triggers, one for FE and a separate one for BE:
  * so if someone only makes changes to FE code, only applicable GitHub actions are triggered, and TF Cloud never enters the workflow
  * or if someone only makes BE changes, no E2E or UI unit tests are run
* Furthermore, Vercel was giving me a lot of trouble along the way and was never a consistent source of builds/deployments (I had to re-deploy a lot, and deal with regular errors) -- and that's too bad, because Vercel can also be a triggter of events and notifications. 
* Obviously, complex workflows may outgrow these tools, and it might be time to upgrade to something like Azure Pipelines, etc.



### GitHub Action Screenshots

UI Unit Tests running in-parallel (via Cypress Dashboard) while simultaneously running Jest Unit Tests as well:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-01-feature-promotion.png?raw=true" alt="testing-01-feature-promotion"/>



Service Tests running simultaneously with E2E Integration Tests:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-02-dev-promotion.png?raw=true" alt="testing-02-dev-promotion"/>





## ✨ Serverless (Terraform Cloud & AWS):

There are only 2 environments on the back-end (BE): **dev** and **prod**. There's no localhost for the BE since it's serverless, obviously, and all local development and testing and all CICD testing is done against the **dev** BE environment/workspace.

Terraform Cloud is used for remote state, remote execution, env variables, and workspaces, as well as CICD triggers via notifications (I started without TF Cloud, and eventually migrated to it).

```
TERRAFORM PLAN and TERRAFORM APPLY commands are NEVER RAN LOCALLY!
```

I have AWS credentials setup as Terraform Cloud *Environment Variables*, that are then available to the `"aws"` provider, [as documented here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables).

I recently passed the [HashiCorp Certified: Terraform Associate](https://www.credly.com/badges/546427ad-5f4e-4324-8fc5-29117d872a0c) certification, and have to say that definitely helped a lot, especially with pushing my configurations to be more enterprise and team-ready.





## 🐞 Caveats, Known Issues, & Room for Improvement

In addition to the Implementation Notes above, some other things to be aware of:

- I'm still using the ROOT AWS USER, instead of a creating a new IAM user just for Terraform.
- I probably exposed secrets in this repo along the way (don't worry, I have since destroyed all those).
- I didn't detail all the separate settings in all cloud services (like Vercel, Terraform), but [contact me](#✉️-contact-me) and I can send you sanitized screenshots of my settings if you run you have questions.
-  The site is not responsive nor done with mobile-first design (maybe a few parts, but the `Edit-Carts` page).
-  The Dark Mode needs some finishing.
-  Needless to say, the testing coverage is still incomplete. Visual Regression tests are needed on all the stories exercised by Cypress, etc.
-  The Products, Dashboard, and some parts of the Cart Lines are only mocked-up, and do not work fully.
- IAC Security: I was thinking about adding security checks to all the endpoints that only allow record-owners from performing CRUD operations on those records, either by:
  -  a) including the currently-logged-in-user's email in the AWS Cognito $context object,or
  -  b) converting all endpoint resolvers into pipeline resolvers, creating a OwnerCheck Terraform Module, and always calling its function at the begining of all pipelines



**Room for CICD Improvement:**

- I'd like to granularize the CICD workflows so they're more idempotent, i.e. only run UI unit tests if there are changes to front-end code, etc... (the next plan was to split up the GitHub Actions into separate workflows, and then they can easily be filtered to only run when FE/BE/relevant code is changed, as well as see if I can leverage the `nx affected` command for more efficient testing, etc.)
- the `01-feature-promotion.yml` GitHub action is currently hard-coded for only my feature branches (see `'kg-**'`); the next thing to do would be to switch to a `feature/kg-2021-...` branch naming convetion to include the `feature/` prefix slug for every developer's branch
- I'd like an additional CICD step that runs **once the entire CICD pipeline is done** -- smoke tests against PROD (a few e2e integration tests). 
- It may be necessary to include a new ***integration*** branch, for team-based development.
- I didn't utilize Jest tests sufficiently for UI Unit Testing, and feel a lot of the E2E Storybook tests could be converted to Jest tests that also exercise the components
- The multi-cart-e2e tests are just a beginning, and also need to exercise the User Auth app views (login, logout, register, forgot-password, change-password)





## ⚙️ Other Helpful Commands

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



## 👾 Code Samples

**React / Next.js / Custom HOC and Hooks**

* [Register](apps/multi-cart/pages/register.tsx) Next Page, [RegisterContainer](apps/multi-cart/appViews/auth/RegisterContainer.tsx), and [RegistrationForm](libs/react-shared-components/src/lib/auth/registration-form/RegistrationForm.tsx)
* [EditCartContainer](apps/multi-cart/appViews/EditCartContainer.tsx),  [EditCart](libs/react-shared-components/src/lib/cart/edit-cart/EditCart.tsx) component (good example of component composition to avoid prop-drilling)
* [NavBar](libs/react-shared-components/src/lib/_layout/nav-bar/NavBar.tsx) component, [LineAccount](libs/react-shared-components/src/lib/line-account/line-account/LineAccount.tsx) component, 
* Custom [incoming webhook](apps/multi-cart/pages/api/webhook-incoming.ts) (devops glue between Terraform Cloud and GitHub Actions)

* [AutoSave](libs/react-shared-components/src/lib/auto-save/AutoSave.tsx) (for formik inputs)
* [useIsAuth](libs/react-shared-components/src/lib/_hooks/useIsAuth.ts), [useMyToasts](libs/react-shared-components/src/lib/_hooks/useMyToasts.ts)
* UI Library / Design system: [Breadcrumbs component](libs/react-ui/src/lib/breadcrumbs/Breadcrumbs.tsx) with [stories](libs/react-ui/src/lib/breadcrumbs/Breadcrumbs.stories.tsx) and [E2E specs](apps/react-ui-e2e/src/integration/Breadcrumbs/Breadcrumbs.spec.ts)

**urql**

* [Graphcache Custom Exchange](libs/react-data-access/src/lib/urql-customizations/cache.ts)
* [Custom GlobalFetching Exchange](libs/react-data-access/src/lib/urql-customizations/createUrqlClient.ts) (uses redux, for logo spinner state)

Context

* (coming soon!)

**GraphQL Schema**

* [AppSync Schema](libs/multi-cart-iac/AppSync/schema/schema.gql)

**CICD / DevOps**

* [Feature Promotion](.github/workflows/01-feature-promotion.yml) (YML)

**Cypress E2E Tests:**

- [Custom commands](apps/multi-cart-e2e/src/support/commands.ts)
- [EDIT CART tests](apps/multi-cart-e2e/src/integration/pages/edit-cart.ts)

**Terraform / AppSync / AWS**

* TF [Register Module](libs/multi-cart-iac/Modules/register), module [definition](libs/multi-cart-iac/tf-modules.tf), [Register Pipeline](libs/multi-cart-iac/tf-pipeline-register.tf) resolver
* TF [Roles and Policies](libs/multi-cart-iac/tf-policies-roles.tf)
* VTL Templates ([addCartLineAccount ReqMapping](libs/multi-cart-iac/AppSync/functions/addCartLineAccount/request-mapping.vtl), [addUser ReqMapping](libs/multi-cart-iac/AppSync/functions/addUser/request-mapping.vtl)) for pipeline AppSync functions
* Lambdas: [register lambda](libs/multi-cart-iac/AppSync/lambdas/register/exports.js)





## ✉️ Contact Me

My personal website is https://karlgolka.com/ and you can email me at contact@karlgolka.com 





## 🌥 Cloud Provider Helpful Links:

Multi-Cart:

| [Vercel](https://vercel.com/charlieargue/multi-cart/deployments) deployments | [GitHub](https://github.com/charlieargue/multi-cart/actions)  actions | [Terraform Cloud](https://app.terraform.io/app/multi-cart/workspaces/multi-cart-dev/runs) dev runs | [Cypress](https://dashboard.cypress.io/organizations/d27854b3-693d-41fe-8fb8-55bac52ed996/projects) dashboard | [AWS](https://console.aws.amazon.com/) console |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |





## 📝 License

[MIT](https://github.com/charlieargue/multi-cart/blob/develop/LICENSE)

*Updated March 2023 @ 9:31pm*
