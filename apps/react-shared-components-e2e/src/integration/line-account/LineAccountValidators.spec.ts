describe('react-shared-components: LineAccountValidators component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccountvalidators--primary'));
    
    it('should render the component', () => {
      
      cy.get('#root').should('contain', 'Percentages:');
      cy.get('#root').should('contain', 'Line Total w/ Tax:');

      cy.findAllByTestId('lineAccountTotalPercentages').should('have.length', 2);
      cy.findAllByTestId('lineAccountLineTotal').should('have.length', 2);

      // invalid, red
      cy.findAllByTestId('lineAccountTotalPercentages').eq(0).should('have.text', '80%')
      cy.findAllByTestId('lineAccountLineTotal').eq(0).should('have.text', '$1.00')
    
      
      // valid, green
      cy.findAllByTestId('lineAccountTotalPercentages').eq(1).should('have.text', '100%')
      cy.findAllByTestId('lineAccountLineTotal').eq(1).should('have.text', '$0.75')
      
      
    });
});
