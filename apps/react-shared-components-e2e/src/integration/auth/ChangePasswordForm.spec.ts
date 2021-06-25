describe('react-shared-components: ChangePasswordForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=changepasswordform--primary'));

  it('should render the component', () => {
    // should contain two inputs and a submit button
    cy.get('#root form input').should('have.length', 2);
    cy.get('#root form button').should('have.length', 1);
    cy.get('#root form button').invoke('attr', 'type').should('equal', 'submit');
    // username should be disabled
    cy.get('#root form input').first().invoke('attr', 'disabled').should('equal', 'disabled');
    cy.get('#root form input').eq(1).invoke('attr', 'disabled').should('equal', undefined);
    // confirm that username has the correct value
    cy.get('#root form input').first().should('have.value', 'abracadabra');


    // confirm that new password field is required
    cy.get('#root form input:invalid').should('have.length', 1);

    // provide an improper password
    cy.get('#root form input').eq(1).type('1lkj;2l3k4j');
    cy.get('#root form input:invalid').should('have.length', 1);
    
    cy.get('#root form input').eq(1).invoke('prop', 'validationMessage')
    .should('equal', 'Please match the requested format.')
    
    // provide a proper password
    cy.get('#root form input').eq(1).type('K1lkj;2l3k4j#');
    cy.get('#root form input:invalid').should('have.length', 0);

    // click submit button
    cy.get('#root form button').click();
    cy.get('#root').should('contain', 'Error');
    cy.get('#root').should('contain', 'Please try a fresh token');
    cy.get('.chakra-alert__title').should('contain', '[Network] Not Found');
    
  });
});
