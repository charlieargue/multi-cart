describe('react-shared-components: LandingLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=landinglayout--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Hello Landing Layout');
      cy.get('#root').should('contain', '© 2021 Karl Golka');
      cy.get('#root').should('contain', 'Privacy');    
      cy.get('#root').should('contain', 'Terms and Conditions');    
      cy.findByTestId('darkModeSwitch').should('be.visible');
      
    });
});
