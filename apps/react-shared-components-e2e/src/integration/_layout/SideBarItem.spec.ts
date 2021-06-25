describe('react-shared-components: SideBarItem component', () => {

  // ------------------------
  it('should render the component WITH NOT CURRENT', () => {
    cy.visit('/iframe.html?id=sidebaritem--with-not-current');

    cy.get('#root').should('contain', 'Products');
    // confirm clickFn works
    cy.get(':nth-child(1) > .chakra-linkbox__overlay').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Clicked');
    });

    // item background should be white (since NOT current)
    cy.get('ul li').first().invoke('css', 'background').should('contain', 'rgba(0, 0, 0, 0)');

  });

  // ------------------------
  it('should render the component WITH CURRENT', () => {
    cy.visit('/iframe.html?id=sidebaritem--with-current');

    cy.get('#root').should('contain', 'Products');
    // confirm clickFn works
    cy.get(':nth-child(1) > .chakra-linkbox__overlay').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Clicked');
    });

    // item background should be PINK
    cy.get('#root ul li').first().invoke('css', 'background').should('contain', 'rgb(254, 215, 226)');

  });
});
