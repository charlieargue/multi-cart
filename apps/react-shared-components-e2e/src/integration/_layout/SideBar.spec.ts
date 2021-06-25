describe('react-shared-components: SideBar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidebar--primary'));

  it('should render the component', () => {
    cy.get('#root').should('contain', 'Dashboard');
    cy.get('#root').should('contain', 'Products');
    cy.get('#root').should('contain', 'Search');
    cy.get('#root').should('contain', 'User Profile');
    cy.get('#root').should('contain', 'Logout');
    cy.get('#root').should('contain', 'Help Center');

    // confirm logoutFn works
    cy.get(':nth-child(1) > .chakra-linkbox__overlay').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Logging Out');
    });
  });
});
