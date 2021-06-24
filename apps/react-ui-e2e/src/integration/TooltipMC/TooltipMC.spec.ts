describe('react-ui: TooltipMC component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tooltipmc--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'Sample Child');
      cy.get('body').should('not.contain', '45pxAbraCadabra');
      cy.get('#root > :nth-child(1)').trigger('mouseover')
      cy.get('body').should('contain', '45pxAbraCadabra');


    });
});
