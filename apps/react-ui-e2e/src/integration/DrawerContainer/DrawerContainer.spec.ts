describe('react-ui: DrawerContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=drawercontainer--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
