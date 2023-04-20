


## 🗂 Repo Overview

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

