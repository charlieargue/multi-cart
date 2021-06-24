describe('react-ui: DrawerContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=drawercontainer--with-nav-bar'));
    
    it('should render the component', () => {
      cy.get('.chakra-slide').should('contain', '🛍');
      cy.get('.chakra-slide').should('contain', 'multi');
      cy.get('.chakra-slide').should('contain', 'cart');
    });
});
