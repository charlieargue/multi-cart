describe('react-shared-components: LineAccountButtonRow component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccountbuttonrow--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-shared-components!');
    });
});
