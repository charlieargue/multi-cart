describe('react-shared-components: CartAvatarInner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cartavatarinner--primary'));

  it('should render the component', () => {
    cy.findByTestId('currentCartTotalItems').should('have.text', '3');
    cy.findByTestId('currentCartTotalCost').should('have.text', '2.75');
  });
});
