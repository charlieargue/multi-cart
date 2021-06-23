describe('react-ui: FullScreenSpinner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fullscreenspinner--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
