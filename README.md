# 🛍 Multi-Cart — a fake fancy shopping cart

![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/01-feature-promotion.yml/badge.svg) ![Feature-Promotion-STATUS](https://github.com/charlieargue/multi-cart/actions/workflows/02-dev-promotion.yml/badge.svg)

[multicart.app](https://multicart.app/)

This is a full-stack **React** **serverless** web application built for demo & study purposes, when I was learning React and GraphQL. 

In April 2023, I upgraded the shopping cart code, guided by React principles and best practices learned over the past couple years, detailed in the section below. 





# 📐 2023 Principles and Best Practices

*With specific examples linked, this React demo app uses:*

- [ ] ==?== :new: **or Coming Soon...** compound components ==if that's true ... make sense to implement somewhere?==
- [ ] component composition (eg. `header=<whatever`)
- [ ] Local state 
- [ ] ==?== :new: **or Coming Soon...** react context 
  - [ ] I'd like to say context option three for the React context over rendering problem.
- [ ] basic hooks: use memo use call back, use ref 
- [ ] strongly typed auto generated react hooks for data fetching by codegen from graphql schema.
- [ ] Typescript generics (show betterUpdateQuery)
- [ ] Edit Cart -> CL cont -> LA cont -> LA (show the **component maps** )
- [ ] url for data management (create Client .ts)
- [ ] Pure state updates - show urql normalized graphe-cache .ts
- [ ] ==?== :new: **or Coming Soon...** Error boundary 
- [ ] ==?== :new: **or Coming Soon...** suspense.
- [ ] CLA Update 2x ISSUE: Let's have that illustrated too like Dan Abramoff's solution number blank for a synchronous middleware, reduce their actions or whatever.
- [ ] ==Other Principles and Standards and Best Practices:==
  - [ ] Normalized component-zation and show links to the **component maps** 
  - [ ] clear container vs dummy component 
  - [ ] show single responsibility S R P like all little functions, they all have less than 100 lines, right?
- [ ] No superfluous comments, 
- [ ] avoided hasty abstractions 
- [ ] tuned for the optimal backend calls.
  - [ ] So there's no superfluous backend calls it tuned for rendering.
- [ ] So there's no superfluous rendering that might be what to do you might need to install.
  - [ ] Why did you render and make sure that's true.
- [ ] I made the components as **testable** as possible, big exclamation point on this one by injecting blah, blah, blah blah blah. Testing!
- [ ] I didn't religiously follow the container component pads and I wonder if I'll end up regretting that, but I don't think so because **MSW** solves a lot of those issues now, you don't have to worry about injecting data, you just mock it.
- [ ] optimistic update is coming soon
- [ ] ...that's just on the front end, the back end ==stays as is/README for now==







## 👾 2023 Front-end Code Samples

Please see this **"Component Guide"** for referencing what components make-up what UI/UX:

[<img src="/Users/karlgolka/PROJECTS/FYI/_typora_images/image-20230419115330971.png">](apps/multi-cart/component-guides/EditCart-Component-GUIDE.png)



**React / Next.js / Custom HOC and Hooks**

* [Register](apps/multi-cart/pages/register.tsx) Next Page, [RegisterContainer](apps/multi-cart/appViews/auth/RegisterContainer.tsx), and [RegistrationForm](libs/react-shared-components/src/lib/auth/registration-form/RegistrationForm.tsx)
* [EditCartContainer](apps/multi-cart/appViews/EditCartContainer.tsx),  [EditCart](libs/react-shared-components/src/lib/cart/edit-cart/EditCart.tsx) component (good example of component composition to avoid prop-drilling)
* [NavBar](libs/react-shared-components/src/lib/_layout/nav-bar/NavBar.tsx) component, [LineAccount](libs/react-shared-components/src/lib/line-account/line-account/LineAccount.tsx) component, 
* Custom [incoming webhook](apps/multi-cart/pages/api/webhook-incoming.ts) (devops glue between Terraform Cloud and GitHub Actions)

* [AutoSave](libs/react-shared-components/src/lib/auto-save/AutoSave.tsx) (for formik inputs)
* [useIsAuth](libs/react-shared-components/src/lib/_hooks/useIsAuth.ts), [useMyToasts](libs/react-shared-components/src/lib/_hooks/useMyToasts.ts)
* UI Library / Design system: [Breadcrumbs component](libs/react-ui/src/lib/breadcrumbs/Breadcrumbs.tsx) with [stories](libs/react-ui/src/lib/breadcrumbs/Breadcrumbs.stories.tsx) and [E2E specs](apps/react-ui-e2e/src/integration/Breadcrumbs/Breadcrumbs.spec.ts)

**urql**

* [Graphcache Custom Exchange](libs/react-data-access/src/lib/urql-customizations/cache.ts)
* [Custom GlobalFetching Exchange](libs/react-data-access/src/lib/urql-customizations/createUrqlClient.ts) (uses redux, for logo spinner state)





# Table of Contents

1. [✈️ 10,000 Foot View](docs/readme/01-ten-thousand-foot-view.md)
2. [▶️ Demo Reels](docs/readme/02-demo-reels.md)
3. [🎯 Purpose](docs/readme/03-purpose.md)
4. [🚀 Technologies Used](docs/readme/04-technologies-used.md)
5. [👨🏻‍💻 Installation and Quick Start](docs/readme/05-installation-quick-start.md)
6. [🗂 Repo Overview](docs/readme/06-repo-overview.md)
7. [👩‍🔬 Testing Pyramid](docs/readme/07-testing-pyramid.md)
8. [⛅️ CI/CD](docs/readme/08-cicd.md)
9. [🐞 Known Issues and Future Enhancements](docs/readme/09-known-issues-and-future-enhancements.md)
10. [⚙️ Helpful Commands](docs/readme/10-helpful-commands.md)
11. [🔋Backend Code Samples](docs/readme/11-backend-code-samples.md)





## Other Info:


* ✉️ **Contact**: my personal website is https://karlgolka.com/ and you can email me at contact@karlgolka.com 

* 📝 **License**: [MIT](https://github.com/charlieargue/multi-cart/blob/develop/LICENSE)

* **🌥 Cloud Providers:**


| [Vercel](https://vercel.com/charlieargue/multi-cart/deployments) deployments | [GitHub](https://github.com/charlieargue/multi-cart/actions)  actions | [Terraform Cloud](https://app.terraform.io/app/multi-cart/workspaces/multi-cart-dev/runs) dev runs | [Cypress](https://dashboard.cypress.io/organizations/d27854b3-693d-41fe-8fb8-55bac52ed996/projects) dashboard | [AWS](https://console.aws.amazon.com/) console |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
