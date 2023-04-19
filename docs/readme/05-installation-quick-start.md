## 👨🏻‍💻 Installation and Quick Start

**✅ Requirements**:

*Before starting 🏁, you need to have these installed on your machine:*

* [Git](https://git-scm.com/) 
* [Node](https://nodejs.org/en/) 
* and [yarn](https://classic.yarnpkg.com/en/docs/install)  

```sh
# clone the repo
git clone https://github.com/charlieargue/multi-cart

# change directory 
cd multi-cart

# install libraries (this can take a few minutes)
yarn
```



**⚡️ Quick Start**

1. <u>Setup environment variables</u>

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

2. <u>Start the front-end</u>

Then you can start the local web development server and fire up the front-end with:

```sh
yarn start    
```

You can view the site at:

* http://localhost:4200/

