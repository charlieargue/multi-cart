# 🛍 Multi-Cart

A fake "**fancy shopping cart**" app built for demo purposes with:
* **React**, 
* **GraphQL** (urql), 
* **Terraform**,
* **AppSync**,
* and other tech.

👍**tldr:** is a full-stack serverless web application (not responsive or mobile-first design at this stage), that is very nearly production-ready and enterprise-grade, can be used as a starter project, and includes robust testing, CICD, shared libraries between the FE & BE, and is team-ready.

🏛 NOTE: *I built this in approx. 4 months at the beginning of 2021, you can see all my GIT commits for more info.*



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

Keep in mind this is a **work-in-progress**, many things are mocked (like Products and the dashboard), and incomplete (like UOMs and Categories). 

This was **inspired by** the many shopping cart and e-commerce projects I have worked on in the past, and is a loose conglomeration of some of them.







# 🔴 KISS PLZ! 💋

# 🔴 TODO: try this! PLUS AWS KEYS?! root user???

# How to install

```sh

# clone the repo
git clone https://github.com/charlieargue/multi-cart

# change directory 
cd multi-cart

# install libraries 
yarn

# 🔴 CURRENT KNOWN ISSUES:
- you will need AWS credentials installed globally
- I'm still using ROOT USER instead of a sub-AWS-user, WIP
- assumes you have yarn installed
```





# Quick Start



**1. Setup AWS credentials**

You will need to grab a `.env` environment variable file:

```
🛑 The back-end will not work without the correct .env files!
```



```sh
# copy env file distribution version
cp .env.dist .env

# make sure to fill it out with the PostgreSQL username/password, see below...
```

Create your two output files:

```sh
# output files
touch output-LCD.txt && touch output-PRINTER.txt
```







**2. Setup environment variables**

You will need to grab a `.env` environment variable file:

```
🛑 The back-end will not work without the correct .env files!
```



```sh
# copy env file distribution version
cp .env.dist .env

# make sure to fill it out with the PostgreSQL username/password, see below...
```

Create your two output files:

```sh
# output files
touch output-LCD.txt && touch output-PRINTER.txt
```









# nx Projects Overview

<img src="/Users/karlgolka/PROJECTS/FYI/_typora_images/image-20210729162309390.png" alt="image-20210729162309390" style="zoom:70%;" />

### [ ] 🔥 Show Dependency Graph!







# Testing

[ ] 🔥 Show Testing pyramid



# CICD

[ ] 🔥 Show CICD diagram (update it plz!)



# Caveats/Issues



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

