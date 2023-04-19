## 👩‍🔬 Testing Pyramid

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

