describe('react-shared-components: CartNameEditable component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cartnameeditable--primary'));
    
    it('should render the component', () => {
      // no input visible at first
      cy.findByTestId('editableCartName').should('have.text', 'Initial Name');
      cy.get('form').should('not.exist');
      cy.get('form > input[type=text]').should('not.exist');
      
      // once clicked, should be an input
      cy.findByTestId('editableCartName').click();
      cy.get('form').should('exist');
      cy.get('form > input[type=text]').should('exist');
      

    });
});
