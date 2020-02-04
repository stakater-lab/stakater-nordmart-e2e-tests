describe('Keycloak login test', function () {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    it('Visit Nordmart Store web application', function () {
        cy.visit(Cypress.env('nordmartWebUrl'))
        cy.get('a[ng-click="login()"]').click()
        cy.wait(3000)

        cy.get('a[ng-click="login()"]').should('not.exist');
        cy.contains("Stakater")
        cy.get('.container-cards-pf').should('have.length', 1)
        cy.get('.navbar-primary li').should('have.length', 2)
        cy.get('.navbar-primary li').contains('Stakater Nordmart Store')

    })
})