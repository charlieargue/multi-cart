describe('react-ui: FullScreenSpinner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fullscreenspinner--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Loading, please wait...');
    });
});
