describe('react-shared-components: CartAvatar component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cartavatar--primary'));

  it('should render the component', () => {
    cy.findByTestId('btnMyCarts').should('be.visible');
    cy.findByTestId('currentCartTotalItems').should('have.text', '0');
    cy.findByTestId('currentCartTotalCost').should('have.text', '0.00');
    
    // can click and open menu and see no carts
    cy.findByTestId('btnMyCarts').click();
    cy.get('#root').should('contain', 'You have no carts!');
    
    // can click new cart button
    cy.findByTestId('btnNewCart').should('be.visible');
    cy.findByTestId('btnNewCart').click();
    cy.get('.chakra-alert__title').should('contain', '[Network]');
  });
});
