describe('react-shared-components: CartMenuRow component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=CartMenuRow--primary'));

  it('should render the component', () => {
    // confirm 2 menu items
    cy.findByRole('menu').should('have.length', 1);
    cy.get('button[role=menuitem]').should('have.length', 2);
    
    // confirm prices are correct
    cy.findAllByTestId('currentCartTotalItems').should('have.length', 2);
    cy.findAllByTestId('currentCartTotalCost').should('have.length', 2);
    cy.findAllByTestId('currentCartTotalItems').eq(0).should('have.text', '3');
    cy.findAllByTestId('currentCartTotalItems').eq(1).should('have.text', '2');
    cy.findAllByTestId('currentCartTotalCost').eq(0).should('have.text', '2.75');
    cy.findAllByTestId('currentCartTotalCost').eq(1).should('have.text', '0.40');

    // confirm names showing
    cy.get('button[role=menuitem]').eq(0).should('contain', 'Cart One');
    cy.get('button[role=menuitem]').eq(1).should('contain', 'Cart Two');

    // confirm current cart row is highlighted green
    //  backgroundColor
    cy.get('button[role=menuitem]').eq(1).invoke('css', 'backgroundColor').should('contain', 'rgb(240, 255, 244)');

  });
});
