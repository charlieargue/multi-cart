describe('react-shared-components: EditCartHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=editcartheader--primary'));

  it('should render the component', () => {
    cy.findByTestId('editableCartName').should('have.text', 'Cart One');
    cy.get('#root').should('contain', 'created');
    cy.get('[data-testid=btnAddCartLine]').should('be.visible');
  });
});
