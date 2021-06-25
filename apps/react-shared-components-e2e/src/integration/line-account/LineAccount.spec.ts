describe('react-shared-components: LineAccount component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccount--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-shared-components!');
    });
});
