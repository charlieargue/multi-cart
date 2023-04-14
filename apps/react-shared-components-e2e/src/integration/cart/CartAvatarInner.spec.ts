describe('react-shared-components: CartSummary component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=CartSummary--primary'));

  it('should render the component', () => {
    cy.findByTestId('currentCartTotalItems').should('have.text', '3');
    cy.findByTestId('currentCartTotalCost').should('have.text', '2.75');
  });
});
