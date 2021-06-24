describe('react-ui: PasswordField component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordfield--primary'));
    
    it('should render the component', () => {
      cy.get('#root #password-label').should('contain', 'Password');
      cy.get('#root a').should('contain', 'Forgot Password?');

      // confirm password visible/masked toggle works
      cy.get('#password').type("SamplePassword")
      cy.get('#password').invoke("attr", "type").should("equal", "password")
      
      cy.get('.chakra-button').click();
      cy.get('#password').invoke("attr", "type").should("equal", "text")
    });
});
