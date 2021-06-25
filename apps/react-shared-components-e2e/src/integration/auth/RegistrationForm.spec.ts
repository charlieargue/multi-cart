describe('react-shared-components: RegistrationForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=registrationform--primary'));

  it('should render the component', () => {
    // should contain three inputs and a submit button
    cy.get('#root form input').should('have.length', 3);
    cy.get('#root form button').should('have.length', 1);
    cy.get('#root form button').invoke('attr', 'type').should('equal', 'submit');
    
    // confirm that username, email, and password fields are required
    cy.get('#root form input:invalid').should('have.length', 3);

    // provide a proper username
    cy.get('#root form input').first().type('karlgolka');
    cy.get('#root form input:invalid').should('have.length', 2);

    // provide an improper email
    cy.get('#root form input').eq(1).type('1lkj;2l3k4j');
    cy.get('#root form input:invalid').should('have.length', 2);
    
    cy.get('#root form input').eq(1).invoke('prop', 'validationMessage')
    .should('contain', 'Please include an \'@\' in the email address')
    
    // provide a proper email
    cy.get('#root form input').eq(1).clear().type('karl@multicart.app');
    cy.get('#root form input:invalid').should('have.length', 1);
    
    // // provide an improper password
    cy.get('#root form input').eq(2).type('1lkj;2l3k4j');
    cy.get('#root form input:invalid').should('have.length', 1);
    
    cy.get('#root form input').eq(2).invoke('prop', 'validationMessage')
    .should('equal', 'Please match the requested format.')
    
    // provide a proper password
    cy.get('#root form input').eq(2).type('K1lkj;2l3k4j#');
    cy.get('#root form input:invalid').should('have.length', 0);

    // NOTE: click submit button ... nothing happens!
    
  });
});
