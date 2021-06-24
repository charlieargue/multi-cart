describe('react-ui: ErrMsg component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=errmsg--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'Sample Error');
      cy.get('#root').find('svg.chakra-icon').should('exist');
    });
});
