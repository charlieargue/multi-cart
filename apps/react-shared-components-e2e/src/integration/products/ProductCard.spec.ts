describe('react-shared-components: ProductCard component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=productcard--primary'));

  it('should render the component', () => {
    // NOTE: this is just a mocked page basically
    cy.get('.chakra-linkbox').should('have.length.greaterThan', 10);
  });
});
