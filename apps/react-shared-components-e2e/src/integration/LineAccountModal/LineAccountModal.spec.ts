describe('react-shared-components: LineAccountModal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccountmodal--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-shared-components!');
    });
});
