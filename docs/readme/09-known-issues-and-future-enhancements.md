## 🐞 Known Issues and Future Enhancements

In addition to the Implementation Notes above, some other things to be aware of:

<<<<<<< HEAD
=======
- I'm still using the ROOT AWS USER, instead of a creating a new IAM user just for Terraform.
- I didn't detail all the separate settings in all cloud services (like Vercel, Terraform), but [contact me](#other-info) and I can send you sanitized screenshots of my settings if you run you have questions.
>>>>>>> main
- The site is not responsive nor done with mobile-first design (maybe a few parts, but the `Edit-Carts` page).
- The Dark Mode needs some finishing.
- Needless to say, the testing coverage is still incomplete. Visual Regression tests are needed on all the stories exercised by Cypress, etc.
- The Products, Dashboard, and some parts of the Cart Lines are only mocked-up, and do not work fully.
- IAC Security: I was thinking about adding security checks to all the endpoints that only allow record-owners from performing CRUD operations on those records, either by:
  -  a) including the currently-logged-in-user's email in the AWS Cognito $context object,or
  -  b) converting all endpoint resolvers into pipeline resolvers, creating a OwnerCheck Terraform Module, and always calling its function at the beginning of all pipelines



**Room for CICD Improvement:**

- I'd like to granularize the CICD workflows so they're more idempotent, i.e. only run UI unit tests if there are changes to front-end code, etc... (the next plan was to split up the GitHub Actions into separate workflows, and then they can easily be filtered to only run when FE/BE/relevant code is changed, as well as see if I can leverage the `nx affected` command for more efficient testing, etc.)
- the `01-feature-promotion.yml` GitHub action is currently hard-coded for only my feature branches (see `'kg-**'`); the next thing to do would be to switch to a `feature/kg-2021-...` branch naming convetion to include the `feature/` prefix slug for every developer's branch
- I'd like an additional CICD step that runs **once the entire CICD pipeline is done** -- smoke tests against PROD (a few e2e integration tests). 
- It may be necessary to include a new ***integration*** branch, for team-based development.
- I didn't utilize Jest tests sufficiently for UI Unit Testing, and feel a lot of the E2E Storybook tests could be converted to Jest tests that also exercise the components
- The multi-cart-e2e tests are just a beginning, and also need to exercise the User Auth app views (login, logout, register, forgot-password, change-password)

