describe('react-shared-components: Hero component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=hero--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'Fancy Shopping Cart');
    });
});
