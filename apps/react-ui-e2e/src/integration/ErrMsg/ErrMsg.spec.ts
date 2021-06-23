describe('react-ui: ErrMsg component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=errmsg--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
