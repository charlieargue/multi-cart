describe('react-ui: SearchBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=searchbar--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'Search by account number or name');
      cy.get('#root svg').should('be.visible')
      cy.get('#root .chakra-input').should('be.visible')
    });
});
