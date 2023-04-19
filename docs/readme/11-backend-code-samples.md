## 🔋Backend Code Samples

**GraphQL Schema**

* [AppSync Schema](../../libs/multi-cart-iac/AppSync/schema/schema.gql)

**CICD / DevOps**

* [Feature Promotion](../../.github/workflows/01-feature-promotion.yml) (YML)

**Cypress E2E Tests:**

- [Custom commands](../../apps/multi-cart-e2e/src/support/commands.ts)
- [EDIT CART tests](../../apps/multi-cart-e2e/src/integration/pages/edit-cart.ts)

**Terraform / AppSync / AWS**

* TF [Register Module](../../libs/multi-cart-iac/Modules/register), module [definition](../../libs/multi-cart-iac/tf-modules.tf), [Register Pipeline](../../libs/multi-cart-iac/tf-pipeline-register.tf) resolver
* TF [Roles and Policies](../../libs/multi-cart-iac/tf-policies-roles.tf)
* VTL Templates ([addCartLineAccount ReqMapping](../../libs/multi-cart-iac/AppSync/functions/addCartLineAccount/request-mapping.vtl), [addUser ReqMapping](../../libs/multi-cart-iac/AppSync/functions/addUser/request-mapping.vtl)) for pipeline AppSync functions
* Lambdas: [register lambda](../../libs/multi-cart-iac/AppSync/lambdas/register/exports.js)





