describe('Products Search Test', function() {
  it('Skakater Nordmart Store', function() {
    cy.visit(Cypress.env('nordmartWebUrl'))
    cy.get('#search-input').type('Solid')
    cy.get('#search-submit').click()

    cy.get('.cart-tile').should('have.length', 1)
    cy.get('.cart-tile').within(() => {
        cy.get('.cart-tile-heading').within(() => {
            cy.get('.ng-binding').should(($h) => {
                expect($h).to.have.length(1)
                expect($h.eq(0)).to.contain('Solid Performance Polo')
            })
        })
        cy.get('.cart-tile-description').should(($h) => {
            expect($h).to.have.length(1)
            expect($h.eq(0)).to.contain('Moisture-wicking, antimicrobial 100% polyester design wicks for life of garment. No-curl, rib-knit collar...')
        })
        cy.get('.col-xs-6').within(() => {
            cy.get('.ng-binding').should(($h) => {
                expect($h).to.have.length(1)
                expect($h.eq(0)).to.contain('$17.80')
            })
        })
    })
  })
})