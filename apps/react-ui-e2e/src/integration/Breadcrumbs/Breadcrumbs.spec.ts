describe('react-ui: Breadcrumbs component', () => {


  it('default state shows just home icon', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-default-state');
    cy.get('[data-test-id="icon-home"]').should('be.visible')
    cy.get('.breadcrumb-item').should('have.length', 1);
    
  });
  
  it('breadcrumb with one link ', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-one-link');
    cy.get('[data-test-id="icon-home"]').should('be.visible');
    cy.get('.active').should('be.visible');
    cy.get('.breadcrumb-item').should('have.length', 2);
  });
  
  it('breadcrumb with multiple links ', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-multiple-links');
    cy.get('[data-test-id="icon-home"]').should('be.visible');
    cy.get('.active').should('be.visible');
    cy.get('.breadcrumb-item').should('have.length', 3);
  });
});
