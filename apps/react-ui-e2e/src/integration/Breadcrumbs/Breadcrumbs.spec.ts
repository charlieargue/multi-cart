describe('react-ui: Breadcrumbs component', () => {


  it('default state shows just home link', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-default-state');
    cy.get('ol.chakra-breadcrumb__list > li').should('be.visible')
    cy.get('ol.chakra-breadcrumb__list > li').should('have.length', 1);
    
  });
  
  it('breadcrumb with one link ', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-one-link');
    cy.get('ol.chakra-breadcrumb__list > li').should('be.visible')
    cy.get('ol.chakra-breadcrumb__list > li').should('have.length', 2);
  });
  
  it('breadcrumb with multiple links ', () => {
    cy.visit('/iframe.html?id=breadcrumbs--with-multiple-links');
    cy.get('ol.chakra-breadcrumb__list > li').should('be.visible')
    cy.get('ol.chakra-breadcrumb__list > li').should('have.length', 3);
    cy.get('ol.chakra-breadcrumb__list > li').eq(2).should('contain', '5');
  });
});
