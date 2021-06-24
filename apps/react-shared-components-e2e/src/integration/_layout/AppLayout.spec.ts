describe('react-shared-components: AppLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=applayout--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Testing');
      cy.findByTestId('btnUserProfile').should('be.visible');
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.findByTestId('bkgndAppLayout').should('be.visible');
      
    });
});
