# ✈️ 10,000 Foot View



==It is built with:==

* ==**React**==
* ==**GraphQL**==
* ==**Terraform** + **AppSync**==
* ==and [other tech](https://github.com/charlieargue/multi-cart#-technologies-used)...==



==production-ready and enterprise-grade== 

==It also includes a robust testing pyramid, CI/CD, and shared libraries between the FE & BE.==

==The Terraform-powered serverless **backend** leverages "cloud native" AppSync VTL resolvers for hi-throughput communication with DynamoDB, giving if performance-at-scale and **no cold starts**.==

Both a <u>GraphQL</u> cloud-managed API as well as a REST API (just 1 page) -- and even a mocked GraphQL API



### Core FE Functionality

It showcases the following functionality and features:

- <u>User Authentication</u> (login, logout, register, forgot/change password)
- Managing and editing multiple shopping <u>Carts</u>
- Adding mocked products as cart line items, and associating multiple funding <u>Accounts</u> (by percentages) with each cart line
-  <u>Auto-generated</u> custom React useMutation hooks and types allowing for strong typing across the whole stack
- <u>Public and private pages</u>, and support for hybrid static & server rendering





### ✨ Serverless Back-end (Terraform Cloud & AWS):

There are only 2 environments on the back-end (BE): **dev** and **prod**. There's no localhost for the BE since it's serverless, obviously, and all local development and testing and all CICD testing is done against the **dev** BE environment/workspace.

Terraform Cloud is used for remote state, remote execution, env variables, and workspaces, as well as CICD triggers via notifications (I started without TF Cloud, and eventually migrated to it).

```
TERRAFORM PLAN and TERRAFORM APPLY commands are NEVER RAN LOCALLY!
```

I have AWS credentials setup as Terraform Cloud *Environment Variables*, that are then available to the `"aws"` provider, [as documented here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables).

I recently passed the [HashiCorp Certified: Terraform Associate](https://www.credly.com/badges/546427ad-5f4e-4324-8fc5-29117d872a0c) certification, and have to say that definitely helped a lot, especially with pushing my configurations to be more enterprise and team-ready.
