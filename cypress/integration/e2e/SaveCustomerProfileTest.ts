describe('Visit profile page', function () {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function fillAndSubmitForm() {
        cy.get('input#address').clear()
        cy.get('input#address').type(`${getRandomInt(10000)} Rue de belleville`)

        cy.get('input[value="female"]').click()

        cy.get('input#phoneNumber').clear()
        cy.get('input#phoneNumber').type('(800)-458-5628')

        cy.get('button[ng-click="save(model)"]').click()
    }

    it('Visit Nordmart Store web application', function () {
        cy.server()

        cy.route({
            method: "POST",
            url: '/api/customers'
        }).as("saveProfile");
        cy.route({
            method: "PUT",
            url: '/api/customers/*'
        }).as("updateProfile");

        cy.visit(Cypress.env('nordmartWebUrl'))
        cy.get('a[ng-click="login()"]').click()
        cy.wait(1000)

        cy.get('ul.navbar-utility a:eq(1)').click()
        cy.get('a[ng-href="#/profile"]').click()
        cy.wait(3000)

        cy.get('input#address')
            .invoke('val')
            .then(value => {
                fillAndSubmitForm();
                cy.wait(value && value.trim().length > 0 ? '@updateProfile' : '@saveProfile').then((xhr) => {
                    const resp = xhr.responseBody
                    expect(resp["response"]).to.have.property('code', '-1')
                    expect(resp["response"]).to.have.property('message', 'Success')
                })
            });
    })
})