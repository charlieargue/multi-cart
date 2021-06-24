describe('react-ui: TextMuted component', () => {
  
  
  it('should render the component with DEFAULT STATE', () => {
    cy.visit('/iframe.html?id=textmuted--with-default-state')
    cy.get('#root').should('contain', 'default');
    cy.get('#root').should('contain', 'just muted text');
    });
  
    it('should render the component with FONT SIZES', () => {
    cy.visit('/iframe.html?id=textmuted--with-font-size')
    cy.get('#root  > p:nth-child(1)').should('contain', '45 px size');
    cy.get('#root  > p:nth-child(1)').invoke('css', 'fontSize').should('equal', '45px');
    
    cy.get('#root  > p:nth-child(2)').should('contain', '25 px size');
    cy.get('#root  > p:nth-child(2)').invoke('css', 'fontSize').should('equal', '25px');
    
    cy.get('#root  > p:nth-child(3)').should('contain', '15 px size');
    cy.get('#root  > p:nth-child(3)').invoke('css', 'fontSize').should('equal', '15px');

    });
    
    it('should render the component with STYLES', () => {
    cy.visit('/iframe.html?id=textmuted--with-styles')
    cy.get('#root  > p:nth-child(1)').should('contain', 'with styles');
    cy.get('#root  > p:nth-child(1)').invoke('css', 'textTransform').should('equal', 'uppercase');
    cy.get('#root  > p:nth-child(1)').invoke('css', 'textAlign').should('equal', 'right');

    });

});
