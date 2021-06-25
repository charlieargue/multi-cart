describe('react-shared-components: DeleteLineAccountButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=deletelineaccountbutton--primary'));

  it('should render the component', () => {
    cy.get('#root svg').should('exist');
  });
});
