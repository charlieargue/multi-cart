describe('react-shared-components: CartNameEditable component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cartnameeditable--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-shared-components!');
    });
});
