describe('react-ui: Sort component', () => {
    
    it('should SortByCreatedAt', () => {
      cy.visit('/iframe.html?id=sort--with-sort-by-created-at');
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
    
    it('should SortByCategory', () => {
      cy.visit('/iframe.html?id=sort--with-sort-by-category');
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});


