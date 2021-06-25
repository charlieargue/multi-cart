describe('react-shared-components: AddLineAccountButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=addlineaccountbutton--primary'));
    
    it('should render the component', () => {
      cy.get('#root button[type=button]').should('exist');
      cy.get('#root button[type=button]').should('contain', 'Add');
      cy.get('#root button[type=button] strong').should('contain', 'account');
      
      // confirm click handler works
      cy.get('#root button[type=button]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Clicked');
      });
    });
});
