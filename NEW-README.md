# 🛍 Multi-Cart — a fake fancy shopping cart

![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/01-feature-promotion.yml/badge.svg) ![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/02-dev-promotion.yml/badge.svg)

This is a demo full-stack serverless web application (built for self-study purposes) that is very nearly production-ready and enterprise-grade, can be used as a starter project, includes robust testing, CICD, shared libraries between the FE & BE, and is team-ready.

It is built with:

* **React**
* **GraphQL**
* **Terraform** + **AppSync**
* and other tech...





## Demo

![multi-cart-overview](https://github.com/charlieargue/readme-assets/blob/main/multi-cart/Multi-Cart-trimmed-xs-TEMP.gif?raw=true)





## Purpose 

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





## How to install

You will need `yarn` and `node` installed on your machine for this to work:

```sh
# clone the repo
git clone https://github.com/charlieargue/multi-cart

# change directory 
cd multi-cart

# install libraries (this can take a few minutes)
yarn
```





## Quick Start

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





## Project Overview

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





## Testing

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
  - *NOTE: my network is a little sluggish in this video, things don't usually lag or take this long, but it does allow for a good showcase of my use of skeletons and loading artifacts :)*







## CICD

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

The whole build and test and deployment process for both the FE and BE takes under 20 minutes, and needless to say has a lot of room for improvement (see notes below for some). But for my purposes, as the sole developer of a server-less API that I could switch over to a mocked-API for rapid UI development ... this worked really, really well! And I image with a team of developers, who could at anytime do the same, this would work very well also -- of course with some additional changes and upgrades.



**Hacky/Bad Implementations:**

- **➰** The DEV Terraform Cloud runs always detect lambda archive changes even when there are none, and so at the moment, even if no back-end IAC changes are made, Terraform Cloud will plan & apply the same series of un-expected changes (mostly because of lambda archive hashes changing). Because of that, I always count on that Apply event and have a TF Cloud Notification wired up kick-off the next GitHub action.



**Other Implementation Notes:**

* The main reasoning for the overly-complicated `TFNotification->MyWebhook->GitHubAction` approach, was to run the Postman API tests **against a freshly-applied DEV Terraform back-end**! So I needed to wait until Terraform was done before running the next GitHub Action.
* I think a better CICD workflow approach is to have two separate "channels" of triggers, one for FE and a separate one for BE:
  * so if someone only makes changes to FE code, only applicable GitHub actions are triggered, and TF Cloud never enters the workflow
  * or if someone only makes BE changes, no E2E or UI unit tests are run
* Furthermore, Vercel was giving me a lot of trouble along the way and was never a consistent source of builds/deployments (I had to re-deploy a lot, and deal with regular errors) -- and that's too bad, because Vercel can also be a triggter of events and notifications. 
* Obviously, complex workflows may outgrow these tools, and it might be time to upgrade to something like Azure Pipelines, etc.



#### GitHub Action Screenshots

UI Unit Tests running in-parallel (via Cypress Dashboard) while simultaneously running Jest Unit Tests as well:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-01-feature-promotion.png?raw=true" alt="testing-01-feature-promotion"/>



Service Tests running simultaneously with E2E Integration Tests:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-02-dev-promotion.png?raw=true" alt="testing-02-dev-promotion"/>





# Serverless (Terraform Cloud & AWS):

[ ] there are only 2 environments on the BE, where as there are atleast 3 (or an infinite dep on how you look at preview branches) on the FE... there's no localhost for the BE since it's serverless, and all local development and testing and all CICD testing is done against the DEV TF environment

[ ] explain that remote execution, so need to setup TF CLoud, env vars, etc... (screen shots, or NO, SKIP ALL THAT< not the point here?!) just broadly, show settings screenshots quickly, it's easy maybe, ok?)

[ ] explain that only DEV and PROD envs (no local, never tf plan/apply locally, etc... remote state)







# Caveats/Issues

### 🔴 CURRENT KNOWN ISSUES:
- you will need AWS credentials installed globally
- I'm still using ROOT USER instead of a sub-AWS-user, WIP
-  (not responsive or mobile-first design at this stage),
- etc... see my GOOGLE DOC list

Room for Improvement:

- granularize the CICD workflows so more idempotent, i.e. only run UI unit tests if there are changes to front-end code, etc... (the next plan was to split up the GitHub Actions into separate workflows, and then they can easily be filtered to only run when FE/BE/relevant code is changed, as well as see if I can leverage the `nx affected` command for more efficient testing, etc.)
- the `01-feature-promotion.yml` GitHub action is currently hard-coded for only my feature branches (see `'kg-**'`); the next thing to do would be to switch to a `feature/kg-2021-...` branch naming convetion to include the `feature/` prefix slug for every developer's branch
- Add additional CICD step that runs smoke tests against PROD (a few e2e integration tests) once everything is complete





# Other helpful Commands



# 📝 License

[MIT]()
