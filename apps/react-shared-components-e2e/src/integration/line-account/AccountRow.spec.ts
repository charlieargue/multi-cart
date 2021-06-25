describe('react-shared-components: AccountRow component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accountrow--primary'));

  it('should render the component', () => {

    // check headings
    cy.get('#root table th').should('have.length', 3);
    cy.get('#root table th').eq(0).should('have.text', 'Account #');
    cy.get('#root table th').eq(1).should('have.text', 'Name');
    cy.get('#root table th').eq(2).should('have.text', 'Amount Remaining');
    
    cy.get('#root table tbody tr').should('have.length', 2);
    
    // check first row 
    cy.get('#root table tbody tr td').eq(0).should('have.text', '60429-623');
    cy.get('#root table tbody tr td').eq(1).should('have.text', 'Automotive');
    cy.get('#root table tbody tr td').eq(2).should('have.text', '$317,243.93');
    
    // check second row 
    cy.get('#root table tbody tr:nth-child(2) td').eq(0).should('have.text', '9-623');
    cy.get('#root table tbody tr:nth-child(2) td').eq(1).should('have.text', 'Office');
    cy.get('#root table tbody tr:nth-child(2) td').eq(2).should('have.text', '$1,555.93');
    
    // confirm second row is highlighted b/c isAlreadySelected
    cy.get('#root table tbody tr:nth-child(2)').invoke('css', 'backgroundColor').should('contain', 'rgb(254, 252, 191)');
    cy.get('#root table tbody tr:nth-child(1)').invoke('css', 'backgroundColor').should('contain', 'rgba(0, 0, 0, 0)');

  });
});
