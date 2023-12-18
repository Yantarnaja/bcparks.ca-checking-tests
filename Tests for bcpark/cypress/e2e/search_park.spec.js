/// <reference types="cypress" />

//const { curryRight } = require("cypress/types/lodash");

describe('check searsh', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    //Vérifier le filtre de recherche
    it('check search filter', () => {
        cy.contains('.menu-button--unselected', 'Find a park').click()
        cy.contains('.mb-2', 'Activities').as('ActivitiesUnit')
        cy.get('@ActivitiesUnit').find('[name="Climbing"]').click()
        cy.get('[type="checkbox"]').should('be.checked')
        cy.get('.result-count-text')
            .should('contain', '40')
        cy.get('@ActivitiesUnit').find('[name="Cycling"]').click()
        cy.get('[type="checkbox"]').should('be.checked')
        cy.contains('.mb-2', 'Popular')
            .should('contain', 'Cycling')

        cy.get('.result-count-text')
            .should('contain', '17')

        cy.get('@ActivitiesUnit')
        cy.contains('.MuiLink-underlineHover', 'Show all 19').click()
        cy.contains('.MuiFormControlLabel-root', 'Windsurfing').click()


        cy.contains('.underline-hover', 'Golden Ears Park').click()
        cy.contains('.park-details', 'Climbing').click()
            .should('contain','Alouette Mountain', 'The Golden Ears')
    })

    //Vérifier l'accessibilité du blog
    it('check blog accessibility', () => {
        cy.get('.home-footer')
        cy.get('a[href="https://engage.gov.bc.ca/bcparksblog/"]').click()
        cy.get ('.wp-block-column')
            .should('contain', 'Welcome to the BC Parks Blog!')
    })
    //Vérifier la description de la sécurité des animaux sauvages
    it('check wildlife safety description', () => {
        cy.contains('.menu-button--unselected','Plan your trip').click()
        cy.contains('.menu-button', 'Visit responsibly').click()
        cy.get('.menu-button-list')
            .should('contain', 'Staying safe')
            .and('contain','Marine visitor guide')
        cy.contains('.menu-button', 'Wildlife safety').click().then(() => {
            cy.get('[id="wildlife-viewing"]')
        })
    })
})
