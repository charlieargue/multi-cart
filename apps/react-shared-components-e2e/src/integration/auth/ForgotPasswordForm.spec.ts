describe('react-shared-components: ForgotPasswordForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=forgotpasswordform--primary'));

  it('should render the component', () => {
    // should contain one input and a submit button
    cy.get('#root form input').should('have.length', 1);
    cy.get('#root form button').should('have.length', 1);
    cy.get('#root form button').invoke('attr', 'type').should('equal', 'submit');
    
    // confirm that email field is required
    cy.get('#root form input:invalid').should('have.length', 1);

    // provide an improper email
    cy.get('#root form input').first().type('1lkj;2l3k4j');
    cy.get('#root form input:invalid').should('have.length', 1);
    
    cy.get('#root form input').first().invoke('prop', 'validationMessage')
    .should('contain', 'Please include an \'@\' in the email address')
    
    // provide a proper email
    cy.get('#root form input').first().clear().type('karl@multicart.app');
    cy.get('#root form input:invalid').should('have.length', 0);

    // click submit button
    cy.get('#root form button').click();
    cy.get('#root').should('contain', 'If an account with that email exists, we sent you an email!');
    
    
  });
});
