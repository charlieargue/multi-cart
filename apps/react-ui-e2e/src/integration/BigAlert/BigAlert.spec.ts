describe('react-ui: BigAlert component', () => {
  
    
    it('should render the component with Warning', () => {
      cy.visit('/iframe.html?id=bigalert--with-warning')
      cy.get('#root').should('contain', 'Sorry...')
      cy.get('#root').should('contain', 'Unfortunately, we could not find this cart!')

    });

    it('should render the component with Error', () => {
      cy.visit('/iframe.html?id=bigalert--with-error')
      cy.get('#root').should('contain', 'Ooops, sorry! An error occurred:')
      cy.get('#root').should('contain', 'Sample error message')
    });

});
