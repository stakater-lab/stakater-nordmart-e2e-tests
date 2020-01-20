describe('Keycloak login test', function () {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    it('Visit Nordmart Store web application', function () {
        cy.visit(Cypress.env('nordmartWebUrl'))

        cy.contains("Stakater")
        cy.get('.container-cards-pf').should('have.length', 1)
        cy.get('.navbar-primary li').should('have.length', 2)
        cy.get('.navbar-primary li').contains('Stakater Nordmart Stores')

    })
})