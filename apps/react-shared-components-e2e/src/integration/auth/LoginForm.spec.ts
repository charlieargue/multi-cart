describe('react-shared-components: LoginForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loginform--primary'));

  it('should render the component', () => {
    // should contain two inputs and two buttons
    cy.get('#root form input').should('have.length', 2);
    cy.get('#root form button[type=submit]').should('have.length', 1);
    cy.findAllByTestId('btnGuestLogin').should('be.visible');

    // confirm that email and passord fields are required
    cy.get('#root form input:invalid').should('have.length', 2);

    // NOTE: remember first input can be EMAIL or USERNAME (so no email validation!)
    // NOTE: and the password field DOES NOT have {...passwordAttributes} validation! (b/c it doesn't matter, matters on changePwd & register!)

    // provide a proper password
    cy.get('#root form input').eq(1).type('K1lkj;2l3k4j#');
    // prodive a username
    cy.get('#root form input').first().type('karlgolka');
    cy.get('#root form input:invalid').should('have.length', 0);

    // click submit button
    cy.get('#root form button[type=submit]').click();
    cy.get('.chakra-alert__title').should('contain', 'Incorrect credentials, please try again!');
    // NOTE: in all these cypress specs, we are NOT connected to the back-end, since no Pages/Container/withUrqlContainers! 
    // and that's fine, here we'll just exercise that components render as expected, and that basic front-end functionality works as 
    // expected (button clicks, form validation, etc...) ---> but will NOT test what happens when API posts are actually made
    // ... that will be the purvue of the multi-cart-e2e tests 

    // click the guest login button
    cy.findAllByTestId('btnGuestLogin').click();
    cy.get('.chakra-alert__title').should('contain', 'Incorrect credentials, please try again!');

  });
});
