describe('react-ui: ActionLink component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=actionlink--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛡 If an account with that email exists, we sent you an email!');
      cy.get('#root').should('contain', 'Go back to homepage.');
    });
});
