describe('react-shared-components: EditCartTableHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=editcarttableheader--primary'));

  it('should render the component', () => {
    cy.get('#root table th').should('have.length', 9);
    cy.get('#root table th').eq(0).should('have.text', '#');
    cy.get('#root table th').eq(1).should('have.text', 'Item #');
    cy.get('#root table th').eq(2).should('have.text', 'Description');
    cy.get('#root table th').eq(3).should('have.text', 'Category');
    cy.get('#root table th').eq(4).should('have.text', 'UOM');
    cy.get('#root table th').eq(5).should('have.text', 'Quantity');
    cy.get('#root table th').eq(6).should('have.text', 'Unit Price');
    cy.get('#root table th').eq(7).should('have.text', 'Total');
  });
});
