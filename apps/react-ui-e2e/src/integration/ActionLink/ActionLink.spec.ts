describe('react-ui: ActionLink component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=actionlink--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
