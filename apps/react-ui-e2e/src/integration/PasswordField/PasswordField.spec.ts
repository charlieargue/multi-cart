describe('react-ui: PasswordField component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordfield--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
