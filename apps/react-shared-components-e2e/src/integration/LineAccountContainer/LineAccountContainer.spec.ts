describe('react-shared-components: LineAccountContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccountcontainer--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-shared-components!');
    });
});
