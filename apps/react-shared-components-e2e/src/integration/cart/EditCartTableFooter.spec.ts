describe('react-shared-components: EditCartTableFooter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=editcarttablefooter--primary'));

  it('should render the component', () => {
    cy.get('#root').should('contain', 'Total:');
    cy.get('#root').should('contain', '$2.75');
    cy.get('#root').should('contain', 'not including shipping');
    cy.get('#root table caption').should('contain', 'Prices are estimates and subject to change');
    cy.get('#root table caption > button').should('have.text', 'Delete Cart');
  });
});
