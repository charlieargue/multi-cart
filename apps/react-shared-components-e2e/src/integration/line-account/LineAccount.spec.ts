describe('react-shared-components: LineAccount component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccount--primary'));
    
    it('should render the component', () => {
      // confirm has all parts
      cy.findByTestId('lineAccountNumber').should('exist');
      cy.findByTestId('lineAccountAmount').should('exist');
      cy.findByTestId('btnDeleteCartLineAccount').should('be.visible');
      cy.findByTestId('lineAccountNumber').should('contain.text', '36987-1018');
      cy.findByTestId('lineAccountAmount').should('contain.text', '$1.50');

      // one input
      cy.get('#root form input').should('have.length', 1);
      
      // with value = 100
      cy.get('#root form input').should('have.value', '100');
      
      // 
      cy.get('#root div.chakra-input__right-addon').should('exist')
        .find('svg').should('exist');
      
    });
});
