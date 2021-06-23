describe('react-ui: Banner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=banner--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
