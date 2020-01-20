describe('Visit profile page', function () {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });
    it('Visit Nordmart Store web application', function () {
        cy.server()
        cy.route({
            method: "POST",
            url: '/api/customers'
          }).as("saveProfile");

        cy.visit(Cypress.env('nordmartWebUrl'))

        cy.get('ul.navbar-utility a:eq(1)').click()
        cy.get('a[ng-href="#/profile"]').click()

        cy.get('input#address').type('8006 Rue de belleville')
        cy.get('input[value="female"]').click()
        cy.get('input#phoneNumber').type('(800)-458-5628')

        cy.get('button[ng-click="save(model)"]').click()

        cy.wait('@saveProfile').then((xhr) => {
            const resp = xhr.responseBody
            expect(resp["response"]).to.have.property('code', '-1')
            expect(resp["response"]).to.have.property('message', 'Success')
        })
    })
})