describe('react-shared-components: NavBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navbar--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.findByTestId('btnUserProfile').should('be.visible');
      cy.get('#root').contains('Logout').should('not.be.visible');
      cy.findByTestId('btnUserProfile').click();
      cy.get('#root').contains('Logout').should('be.visible');
      
    });
});
