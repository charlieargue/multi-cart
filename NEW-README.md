# 🛍 Multi-Cart

A fake "**fancy shopping cart**" app built for demo purposes with:
* **React**, 
* **GraphQL** (urql), 
* **Terraform**,
* **AppSync**,
* and other tech.

👍**tldr:** is a full-stack serverless web application (not responsive or mobile-first design at this stage), that is very nearly production-ready and enterprise-grade, can be used as a starter project, and includes robust testing, CICD, shared libraries between the FE & BE, and is team-ready.





# Quick Demo

![multi-cart-overview]()

🔴 TODO: keep it under 10 mb! for Github-issues trick!





# Purpose 

This was built for purposes of `self-study as I was upskilling` from **angular & node/REST APIs** to **react** along with various GraphQL backends, namely:

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

NOTE: *I built this in approx. 4 months at the beginning of 2021, you can see all my GIT commits for more info.*







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

**2. Start up front-end**

Then you can start the local web development server and fire up the front-end with:

```sh
yarn start		
```

You can view the site at:

* http://localhost:4200/





# Monorepo Overview

<img src="/Users/karlgolka/PROJECTS/FYI/_typora_images/image-20210729162309390.png" alt="image-20210729162309390" style="zoom:70%;" />

### [ ] 🔥 Show Dependency Graph!







# Testing

[ ] 🔥 Show Testing pyramid

[ ] show how to run ALL tests locally!



# Serverless (Terraform Cloud & AWS):

[ ] explain that remote execution, so need to setup TF CLoud, env vars, etc... (screen shots, or NO, SKIP ALL THAT< not the point here?!) just broadly, show settings screenshots quickly, it's easy maybe, ok?)

[ ] explain that only DEV and PROD envs (no local, never tf plan/apply locally, etc... remote state)



# CICD

[ ] 🔥 Show CICD diagram (update it plz!)

[ ] explain need to move KEYS up into TF Cloud,  

[ ] explain TF notification -> GHA webhook



# Caveats/Issues

### 🔴 CURRENT KNOWN ISSUES:
- you will need AWS credentials installed globally
- I'm still using ROOT USER instead of a sub-AWS-user, WIP

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

