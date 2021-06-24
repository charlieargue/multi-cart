describe('react-shared-components: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'Home');
      cy.get('#root').should('contain', 'Register');    
      cy.get('#root').should('contain', 'Login');    
      
    });
});
