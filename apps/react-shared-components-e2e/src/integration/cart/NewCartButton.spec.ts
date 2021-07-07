describe('react-shared-components: NewCartButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=newcartbutton--primary'));

  it('should render the component', () => {
    cy.findByTestId('btnNewCart').should('be.visible');
    cy.get('#root').should('contain', 'New Cart');
    cy.findByTestId('btnNewCart').click();
    cy.get('.chakra-alert__title').should('contain', '[Network]');
  });
});
