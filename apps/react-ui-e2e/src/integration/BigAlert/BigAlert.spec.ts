describe('react-ui: BigAlert component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bigalert--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
