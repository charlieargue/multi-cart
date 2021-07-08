describe('react-shared-components: EditCart component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=editcart--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.findByTestId('btnUserProfile').should('be.visible');
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.findByTestId('bkgndAppLayout').should('be.visible');
      
      // confirm breadcrumbs
      cy.get(':nth-child(1) > .chakra-breadcrumb__link > .chakra-text').should('have.text', 'Dashboard');
      cy.get(':nth-child(2) > .chakra-breadcrumb__link > .chakra-text').should('have.text', 'Cart');
      
      // and since no network, should be 
      // NOTE: tried storybook urql addon, but got error
      cy.get('#root').should('contain', 'Ooops, sorry! An error occurred:');
      cy.get('#root').should('contain', '[Network]');
      

    });
});
