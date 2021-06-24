describe('react-ui: Sort component', () => {

  it('should SortByCreatedAt', () => {
    cy.visit('/iframe.html?id=sort--with-sort-by-created-at');
    cy.get('#root > :nth-child(1)').should("contain", "4th # 4 - 2021-06-23T23:27:51.943Z (a)")
    cy.get('#root > :nth-child(2)').should("contain", "3rd # 3 - 2021-05-23T23:27:51.943Z (b)")
    cy.get('#root > :nth-child(3)').should("contain", "2nd # 2 - 2021-04-23T23:27:51.943Z (d)")
    cy.get('#root > :nth-child(4)').should("contain", "1st # 1 - 2021-03-23T23:27:51.943Z (c)")
  });

  it('should SortByCategory', () => {
    cy.visit('/iframe.html?id=sort--with-sort-by-category');
    cy.get('#root > :nth-child(1)').should("contain", "(a)")
    cy.get('#root > :nth-child(2)').should("contain", "(b)")
    cy.get('#root > :nth-child(3)').should("contain", "(c)")
    cy.get('#root > :nth-child(4)').should("contain", "(d)")
  });
});


