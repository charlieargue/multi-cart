describe('react-shared-components: Footer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=footer--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', '© 2021 Karl Golka');
      cy.get('#root').should('contain', 'Privacy');    
      cy.get('#root').should('contain', 'Terms and Conditions');    
      
    });
});
