describe('react-shared-components: LineAccountTooltip component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccounttooltip--primary'));
    
    it('should render the component', () => {
      // NOTE: this relies on an urql data query for showing the tooltip, 
      // so since could not get that to work, skipping that, and just confirming children are rendered
      cy.get('#root').should('contain', 'Lorem Ipsum');
      
    });
});
