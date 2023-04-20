## 🎯 Purpose 

This was built for purposes of `self-study as I was upskilling` from angular & node/REST APIs **to React**, and I incrementally changed the GraphQL backends along the way, namely:

* first **react** & <u>PostgreSQL+TypeOrm+TypeGraphQL</u> (after diligently going thru [Ben Awad's 14-hour Full-Stack React Course](https://www.youtube.com/watch?v=I6ypD7qv3Z8))
* then **react** & a <u>mocked</u> GraphQL backend (for rapid UI development, using Next.js' public api pages)
* and finally **react** & a <u>serverless</u> backend (with Terraform+AppSync+DynamoDB+Cognito)

While building the app, I strove to include the latest web development **best practices and tools**, that I had been wanting to learn and use for a long time.

I also did my best to keep things as **Production-ready** as I could, for instance with multiple environments and safe secrets management, as well as keeping the project **Team-ready** as well, so that other contributors could jump right in and pitch in development into the CICD workflows. 

I designed the **CICD** workflows to make full use of my testing pyramid -- i.e. not merging PRs if tests fail, and keeping things as automated as possible. There's definitely room for improvement, see the CICD section below details, but it all works fine as-is and does not take too long (dozens of e2e tests running in parallel complete in a couple minutes, the entire pipeline taking less than 20 minutes).

Additionally, I tried to leverage **cloud** and  **"Cloud-Native"** technologies as much as possible, for example:

* using Terraform Cloud, Cypress Dashboard, GitHub Actions, and Vercel

* choosing AWS "Cloud Native" **VTL** template resolvers over Lambdas wherever possible

  * > to minimize cold start and latency due to network I/O for resolver invocation...

Finally, one of my primary goals was to basically build a **enterprise-grade starter boilerplate** that I could use on future projects, that was also **scalable**. Using Terraform, AppSync, DynamoDB, and Cognito allow for that. Cognito apparently can handle millions of users for authentication out-of-the-gate with minimal adjustment. With DynamoDB, you would need to add some `autoscaling` configurations, and so forth.  On the front-end, the Vercel Edge Network handles most of that for us.

Keep in mind this is a **work-in-progress**, many things are mocked (like Products and the dashboard), and incomplete (like UOMs and Categories). Caveats, limitations, and issues are detailed below.

This was **inspired by** the many shopping cart and e-commerce projects I have worked on in the past, and is a loose conglomeration of some of them.

*NOTE: I built this in approx. 4 months at the beginning of 2021, you can see all my GIT commits for more info.*

