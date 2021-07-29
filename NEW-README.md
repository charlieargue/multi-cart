# 🛍 Multi-Cart

A fake "**fancy shopping cart**" app built for demo purposes with:
* **React**, 
* **GraphQL** (urql), 
* **Terraform**,
* **AppSync**,
* and other tech.





# Quick Demo

![multi-cart-overview]()

🔴 TODO: keep it under 10 mb! for Github-issues trick!





# Purpose 

This was built for purposes of `self-study as I was upskilling` from **angular & node/REST APIs** to **react** along with various GraphQL backends, namely:

* first **react** & <u>PostgreSQL+TypeOrm+TypeGraphQL</u> (after diligently going thru [Ben Awad's 14-hour Full-Stack React Course](https://www.youtube.com/watch?v=I6ypD7qv3Z8))
* then **react** & a <u>mocked</u> GraphQL backend (for rapid UI development, using Next.js' public api pages)
* and finally **react** & a <u>serverless</u> backend (with Terraform+AppSync+DynamoDB+Cognito)

In addition to building the app, I also strove to include all-around modern web development **best practices**, that I had been wanting to learn and use for a long time, such as using:

- React (urql, formik, redux, Context, etc.)
- nx mono-repo (shared libraries)
- Storybook
- Jest
- Cypress
- Next.js
- Terraform
- AWS (AppSync, Cognito, DynamoDB, etc.)
- and more.

I also did my best to keep things as **Production-ready** as I could, for instance with multiple environments and safe secrets management, as well as keeping the project **Team-ready** as well, so that other contributors could jump right in and pitch in development into the CICD workflows. 

I designed the **CICD** workflows to make full use of my testing pyramid -- i.e. not merging PRs if tests fail, and keeping things as automated as possible. There's definitely room for improvement, see the CICD section below details, but it all works fine as-is and does not take too long (dozens of e2e tests running in parallel complete in a couple minutes, the entire pipeline taking less than 20 minutes).

Additionally, I tried to leverage **cloud** and  **"Cloud-Native"** technologies as much as possible, for example:

* using Terraform Cloud, Cypress Dashboard, GitHub Actions, and Vercel

* choosing AWS "Cloud Native" **VTL** template resolvers over Lambdas wherever possible

  * > to minimize cold start and latency due to network I/O for resolver invocation...

Finally, one of my primary goals was to basically build a **enterprise-grade starter boilerplate** that I could use on future projects, that was also **scalable**. Using Terraform, AppSync, DynamoDB, and Cognito allow for that. Cognito apparently can handle millions of users for authentication out-of-the-gate with minimal adjustment. With DynamoDB, you would need to add some `autoscaling` configurations, and so forth.  On the front-end, the Vercel Edge Network handles most of that for us.

Keep in mind this is a **work-in-progress**, many things are mocked (like Products and the dashboard), and incomplete (like UOMs and Categories). 

This was **inspired by** the many shopping cart and e-commerce projects I have worked on in the past, and is a loose conglomeration of some of them.







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

SO... try on LJI old laptop?

- try with another/new user on this laptop?
- hmmm......







# Testing

# CICD

# Caveats/Issues







**1. Setup environment variables and output files**

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

# GraphQL Playground

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to open the **GraphQL Playground** in the browser.


## GraphQL Mutations

To view all `products`, `users`, or `scans`, use:
```graphql
# view products
{
  products {
    id
    barcode
    name
    price
    createdAt
    
  }
}


# view users
{
  users {
    id
    email
    username
    createdAt
    
  }
}


# view scans (with product data)
{
  scans {
    id
    userId
    productId
    price
    createdAt
    product {
      id
      name
      price
    }
  }
}

```

To make a `SALE` operation, for example:
```graphql
# example values
mutation {
  sale(
    barcode: "68151-4146",
    userId: 22) {
    id
    userId
    productId
    createdAt
  }
}

```

And to perform an `EXIT` operation:
```graphql

{
  exit
}
```


# Running Tests

First, setup the test DB:
```sh
# change username!
createdb knowde-pos-test -U 🟡karlgolka🟡

# NOTE: you DO NOT need the server nor `yarn watch` running for tests to work!

# run tests
yarn test

```

# Output Files

Output devices were mocked to be files, as per instructions. They can be viewed here:
*  [🖥 LCD output file](output-LCD.txt)
*  [🖨 PRINTER output file](output-PRINTER.txt)