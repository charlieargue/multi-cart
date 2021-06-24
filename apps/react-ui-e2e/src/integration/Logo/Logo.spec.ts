describe('react-ui: Logo component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logo--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
    });
});
