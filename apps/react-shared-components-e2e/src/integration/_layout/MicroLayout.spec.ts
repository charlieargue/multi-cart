describe('react-shared-components: MicroLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=microlayout--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Enter a New Password');
      cy.get('#root').should('contain', '🔐 And then login into your account again, please!');
      cy.get('#root').should('contain', 'Testing MicroLayout');    
      cy.findByTestId('darkModeSwitch').should('be.visible');
      
    });
});
