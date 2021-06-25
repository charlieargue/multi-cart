describe('react-shared-components: FilterableAccountTable component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=filterableaccounttable--primary'));

  it('should render the component', () => {

    // check headings
    cy.get('#root table th').should('have.length', 3);
    cy.get('#root table th').eq(0).should('have.text', 'Account #');
    cy.get('#root table th').eq(1).should('have.text', 'Name');
    cy.get('#root table th').eq(2).should('have.text', 'Amount Remaining');
    
    // check first row 
    cy.get('#root table tbody tr td').eq(0).should('have.text', '1232');
    cy.get('#root table tbody tr td').eq(1).should('have.text', 'Sample');
    cy.get('#root table tbody tr td').eq(2).should('have.text', '$300');
  

  });
});
