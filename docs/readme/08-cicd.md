## ⛅️ CI/CD

The CICD workflows are composed of a few separate pieces:

* **GitHub action #1** triggered by commits to any feature branches (`01-feature-promotion.yml`)
* **GitHub action #2** triggered by a repository dispatch event (which comes from `webhook-incoming.ts`)
* an **Incoming Webhook** on the multi-cart website (hosted thanks to Next.js' api pages)
* **Vercel**'s automatic builds and deployments 
* **Terraform Cloud**'s automatic planning and applying of configurations and <u>notifications</u>
* **Cypress Dashboard**'s <u>parallel testing</u> across multiple GitHub Action machines



### Workflow Illustration

This illustration tries to simplify and explain the workflow in its entirety:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/MultiCart-CICD-Workflows-Updated.png?raw=true" alt="MultiCart-CICD-Workflows-Updated" style="zoom:100%;" />



### Detailed Steps

In detailed steps, here's what happens when a developer makes a local commit to their feature branch:

(*In this case, I'm making changes to both FE and BE code*)

1. Files are linted locally, and then pushed up to the repo origin
2. That triggers **Vercel** to build and deploy a preview of my feature branch
3. Also triggered by Step #1, **GitHub Action #1**, starts 
   1. That GHA #1 will simultaneously run Jest Unit Tests and all the Cypress Storybook Tests, the latter being run in-parallel across multiple GitHub machines, with a little help from Cypress Dashboard
4. If all those complete without errors, a pull-request (PR) will be created and automatically merged, merging this feature branch with the **develop** branch
5. That merge triggers **Vercel** to build and deploy the **develop** branch
6. That merge also simultaneously triggers **Terraform Cloud** to run and apply configuration changes (hackily, see note ➰, it always runs, even if no BE changes were made)
7. Once applied, **Terraform Cloud** fires off a *Notification* to my custom incoming webhook (`webhook-incoming.ts`) which simply fires off a *Repository Dispatch* to my GitHub Action #2
8. **GHA #2** proceeds to simultaneously run the Service Tests (against the DEV API) and the Integration Cypress E2E tests (against the develop branch front-end)
9. If all those complete without errors, a PR will be created and automatically merge the develop branch with the **main** production branch
10. That triggers **Vercel** to build and deploy the **main** production branch
11. That merge simultaneously triggers **Terraform Cloud** to run and apply configuration changes to the **production** environment (but in this case, ONLY if there were any changes to the IAC code... this is a TF Cloud setting)



#### Additional Notes

The whole build and test and deployment process for both the FE and BE takes under 20 minutes, and needless to say has a lot of room for improvement (see caveats below). But for my purposes, as the sole developer of a server-less API that I could switch over to a mocked-API for rapid UI development ... this worked really, really well! And I image with a team of developers, who could at anytime do the same, this would work very well also -- of course with some additional changes and upgrades.



**Hacky/Bad Implementations:**

- **➰** The DEV Terraform Cloud runs always detect lambda archive changes even when there are none, and so at the moment, even if no back-end IAC changes are made, Terraform Cloud will plan & apply the same series of un-expected changes (mostly because of lambda archive hashes changing). Because of that, I always count on that Apply event and have a TF Cloud Notification wired up kick-off the next GitHub action.



**Other Implementation Notes:**

* The main reasoning for the overly-complicated `TFNotification->MyWebhook->GitHubAction` approach, was to run the Postman API tests **against a freshly-applied DEV Terraform back-end**! So I needed to wait until Terraform was done before running the next GitHub Action.
* I think a better CICD workflow approach is to have two separate "channels" of triggers, one for FE and a separate one for BE:
  * so if someone only makes changes to FE code, only applicable GitHub actions are triggered, and TF Cloud never enters the workflow
  * or if someone only makes BE changes, no E2E or UI unit tests are run
* Furthermore, Vercel was giving me a lot of trouble along the way and was never a consistent source of builds/deployments (I had to re-deploy a lot, and deal with regular errors) -- and that's too bad, because Vercel can also be a triggter of events and notifications. 
* Obviously, complex workflows may outgrow these tools, and it might be time to upgrade to something like Azure Pipelines, etc.



### GitHub Action Screenshots

UI Unit Tests running in-parallel (via Cypress Dashboard) while simultaneously running Jest Unit Tests as well:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-01-feature-promotion.png?raw=true" alt="testing-01-feature-promotion"/>



Service Tests running simultaneously with E2E Integration Tests:

<img src="https://github.com/charlieargue/readme-assets/blob/main/multi-cart/testing-02-dev-promotion.png?raw=true" alt="testing-02-dev-promotion"/>



