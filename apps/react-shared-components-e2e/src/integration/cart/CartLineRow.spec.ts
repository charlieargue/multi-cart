describe('react-shared-components: CartLineRow component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cartlinerow--primary'));

  it('should render the component', () => {

    // should be two lines
    cy.get('table tbody tr').should('have.length', 4);

    // confirm index labels
    cy.get('table tbody tr:nth-child(1) td').eq(0).should('have.text', '1');
    cy.get('table tbody tr:nth-child(3) td').eq(0).should('have.text', '2');

    // confirm itemids
    cy.get('table tbody tr:nth-child(1) td').eq(1).find('input').should('have.value', '101');
    cy.get('table tbody tr:nth-child(3) td').eq(1).find('input').should('have.value', '102');

    // confirm descriptions
    cy.get('table tbody tr:nth-child(1) td').eq(2).find('input').should('have.value', 'Line 1');
    cy.get('table tbody tr:nth-child(3) td').eq(2).find('input').should('have.value', 'Line 2');

    // confirm quantity
    cy.get('table tbody tr:nth-child(1) td').eq(5).find('input').should('have.value', '1');
    cy.get('table tbody tr:nth-child(3) td').eq(5).find('input').should('have.value', '2');

    // confirm price
    cy.get('table tbody tr:nth-child(1) td').eq(6).find('input').should('have.value', '1.25');
    cy.get('table tbody tr:nth-child(3) td').eq(6).find('input').should('have.value', '0.75');

    // confirm line totals
    cy.get('table tbody tr:nth-child(1) td').eq(7).should('have.text', '$1.25');
    cy.get('table tbody tr:nth-child(3) td').eq(7).should('have.text', '$1.50');

    // confirm delete buttons
    cy.findAllByTestId('btnDeleteCartLine').should('have.length', 2);
  });
});
