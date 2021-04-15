# multi-cart Agile Board

Agile/kanban board for multi-cart


### 😎 Wishlist

- [ ] addCartLineAccount INPUT TYPE
- [ ] add back CAT/UOM dropdowns, and when you change them, you get a modal: "for this item only, or for this item in the master catalog? and then are you sure?"
- [ ] CMPNT COMPISITION: try something different like **<CartLines lines={cart.cartLines}> ... children <LineAccounts accounts={}>** so all the **data?.map?...** logic is hidden in the lib/shared-cmpnts
- [ ] validation on cart line (item, desc?, qty, price, etc...)  
- [ ] finish cart line row (UOM, categories) ... or wait till store?  
- [ ] UI: store: switch to chakra-ui (follow their landing-page tutorial see #slack/design-resources) -- use that for store page! or keep react-bootstrap, but just DO SAME THING w/o chakra! FIGMA and nice design for my site/CV demo-app + code-samples  
- [ ] “store” - “catalog” function  
  - [ ] store: Just add items, have the same COLUMNS as cart line  
  - [ ] store: Hydrate with mockaroo  
  - [ ] store: Make a new shop page  
  - [ ] store: Have two modes: Condenscned table view & Bigger thumbnail view  
  - [ ] store: Paging! Must use paging! Sorry :)  
  - [ ] store: Click products -> product details (SSR these pages!) - PRODUCTS PAGE: https://getbootstrap.com/docs/5.0/examples/album/# -> https://getbootstrap.com/docs/5.0/examples/product/ + https://getbootstrap.com/docs/5.0/examples/jumbotron/ & maybe https://getbootstrap.com/docs/5.0/examples/starter-template/ & maybe https://getbootstrap.com/docs/5.0/examples/features/  THIS: ===> https://chakra-templates.dev/components/cards
  - [ ] store: And these pages are public! Don’t need to be authed to see them!  
  - [ ] store: But if you are authed You get BUY NOW buttons! (both on store and details views)  
  - [ ] store: BUY NOW: It goes into your current cart 🔴 What if you don’t have a current cart !!!  
- [ ] do react basics tutorial (see #slack)  
- [ ] do all the rest of tutorials in my #react channel!  
- [ ] PRINT: tao of react, and then find that in #react slack and FINISH going thru there upwards!  
- [ ] fix those LINT warnings (multi-cart)  
- [ ] PRETTIER: get those attributes breaking in JSX!  
- [ ] UI: make a drawer and remember settings with either 2) zustand, or 3) redux, or 1) context (use UI: https://getbootstrap.com/docs/5.0/examples/sidebars/#)  
- [ ] UI: I want this 2nd-ary nav for breadcrumbs! https://getbootstrap.com/docs/5.0/examples/offcanvas-navbar/ (and no more gray alert box)  
- [ ] UI: how do I get a loading line indicator intercepting all urql calls like I had in angular?  
- [ ] UI: good thing to work on would be ability to collapse ALL/one-at-a-time the Line-Accounts (or just toggle on/off) and then SAVE that to state somewhere (but NOT persist), so you can navigate around and always see your cart collapsed/expanded (like ClickUp did)  
- [ ] Add user profile w/ Upload image! Copy 🇵🇱 multi-part upload  
- [ ] urql assume success! (optimistic API calls!) see 🇵🇱  and https://github.com/FormidableLabs/urql/issues/863  
- [ ] HAND=OFF: good tricky flow! plus good broadcasting with SOCKET.IO or just gql? SEE BEN's google-docs-CLONE w/ socket.io  
- [ ] must invalidate all posts / cache upon login (and elsewhere!)  see BEN 11:43:20 invalitedAllPosts()  
- [ ] would be nice to have a way to add an account # (from some other account), and it be broadcast to all clients, so that it's automatically available to all current users!  
- [ ] MOCK: Bring back / update mocked api (see doc notes)  
- [ ] check what/if-anything PLOP offers 🇵🇱 that NX isn't providing  
- [ ] BE: jest test login!  
- [ ] BE:🛡 make sure isAuth is working as expected  
  - [ ] BE:🛡 un-authed user cannot CRUD carts  
  - [ ] BE:🛡 user can only see their own carts  
  - [ ] BE:🛡 make these BE jest tests!  
- [ ] gotta use dataloader to solve n+1 probem, see li-reddit; apparently AppSync makes this issue moot -- solves the n+1 problem! https://youtu.be/VnG7ej56lWw?t=745  
- [ ] libs: make multi-cart directory, move all in there  
- [ ] Tsconfigs and base/extended/lib-VS-app versions, and how I set it up is confusing still!!! Needs work  
- [ ] print out POSGRES basics  
- [ ] I'd like to implement cloneRecalcAndSaveCostCenters and see the DIFFERENCE (ng vs react)  
- [ ] go thru all my "TODO:" in codebase  
- [ ] go thru all my "CONFUSION:" in codebase, and remove all unecessary comments  

### 🐞 BUGS

- [ ] BUG: 🔴 ERROR: percentage addition is not working correctly, see BUG on desktop (100 not summing up to 100)
- [ ] BUG: 🔴 ERROR: JavaScript heap out of memory -- BE or FE? split up and (TODO: if that solves it, add it to the command array for FE:serve!)
- [ ] BUG: auto-completing upon bad number and all messed up after, see: https://www.loom.com/share/dc660f891df3425f887d1e97d295167c (possible circumvention by NOT allowing save if line totals are not 100%? unless you're creating a distribution, and not finished yet? TBD)  
- [ ] BUG: Saving message appears during each EDIT CART page load (though I thought I stopped that with the useRef initial load)  
- [ ] BUG: 🔴 ERROR: ON LOGIN, FORGOT PWD, etc.: React does not recognize the nextHref prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase nexthref instead. If you accidentally passed it from a parent component, remove it from the DOM element.




### 👿 Stuck On:

- [ ] STUCK: edit cart name: ERROR: **cancel all subscriptions** error when click above-input-in-green-box quickly couple/few times!  
- [ ] STUCK: LA validation FAIL ==> red box on LA container & red box on cart avatar (tried everything but Formik JSX causes error)  

### 📘 Backlog

- [ ] There’s ZERO error handling on login, add some toasts please! (maybe with 🇵🇱 urql interceptor / toast container)  
- [ ] change/forgot password/login/register need work/checking (token works, nodemailer?), validation?  
- [ ] TESTS: Bring over cypress tests (flaky, try to improve those! or can jest tests be sufficient to test those, and this is chaos? what was auto-generated by nx?)  
- [ ] Dockerize the backend (before AppSync!) -- see #docker  
- [ ] BE: ⚙️ AppSync: again, just after making 1 or two entities mac (cart, user), see if you can whip up an appsync backend on AWS real quick (terraform, etc…)  
- [ ] switch to Chakra before JESTING/STORYBOOKIng?????  
- [ ] LA TESTING: lock down with JEST (try exercising auto-save here???)  
- [ ] LA TESTING: lock down with CYPRESS (avoid auto-save & chaos tests)  
- [ ] storybook for Line Accounts stuff  

### 💪 Todo

- [ ] UI: for Line Account SELECTION, maybe NO MODAL and instead drawer, https://chakra-ui.com/docs/overlay/drawer
- [ ] UI: for CartAvatar, use this: https://pro.chakra-ui.com/components/application-ui/cards
- [ ] UI: build it all out, piece by piece, overhauling and using the ready pages I already built in my **chakra-demo-app**
- [ ] UI: for Forgot Pwd -> the token page: https://pro.chakra-ui.com/components/application-ui/banners
- [ ] UI: clean all the placeholder text and stuff up!


### 🧠 In Progress
- [ ] UI: see the next with-chakra-ui TEMPLATE and bring it over, get that working!
- [ ] UI: THEN remove react-bootstrap!
- [ ] UI: keep some of my _theme scss, right? the new global stuff? TBD


### Done

- [ ] FIX login form: seeing doubles!  
- [ ] libs: migrate login/register/forgot-pwd/change-pwd also into react-shared-components (just leave the pages as shells that call shared components, no need for container components)  
- [ ] libs: migrate over multi-cart/appViews/carts stuff over into react-shared-components (like line-account)  
- [ ] no go back and remove all **style={{}}** occurrences and put in proper BEM **...module.scss** files  
- [ ] 🟦 🟦 🟦 🟦 START WITH: too much work, and I will never have non-multi-cart projects here, so no need for libs/DIRECTORY... instead, make util be just util  
- [ ] FIX that issue with libs + next + nx not allowing CSS/SCSS!!! ••• MAKE REPRO and get help •••  
- [ ] 💎 VIP STUCK: 💎 cannot get CSS/SCSS to work/import within libs/projects (next/nx issue), REPRO / see google doc notes  
- [ ] FEATURE-NOT-BUG: CAN QUICKLY TOGGLE CARTS -- isOpen/Closed for carts avatar dropdown: 1) useContext, then 2) try zustand  
- [ ] highlight current cart in carts list  
- [ ] make cart name clickable and editable  
- [ ] la: cant add the same account number twice, highlight+disable plz  
- [ ] 🐞 When you delete a user’s current cart, SET User.currentCartId to null FIRST? Set the next one, or what if they don’t have one?  And graphe-cache has to update the Me query during deleteCart !!! if user.currentCartId is changed! that'll update the avatar  
- [ ] olas: Should be fast!, good for modal work, use CONTEXT on that modal?!  
- [ ] make sure all currency is using the same toNiceCurrency() util!  
- [ ] LA validation - can't have 0% (formik validation + red border + LA container red + avatar red)  
- [ ] LA validation - must total amount = ltwt  
- [ ] LA validation - must be 100% total (CART AVATAR becomes red! (pure gql cache or is need UI state?)  )  
- [ ] searching/filtering within line account modal  
- [ ] UI: (GOOD ENOUGH) fix the alignment on the EDIT CART page (left and right edges should all align)  

