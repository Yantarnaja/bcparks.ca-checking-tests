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

    //Trouver un parc à partir du champ de saisie
    it('find a park from input field', () => {
        cy.get('#park-search-typeahead').type('Dragon')
        cy.get('.dropdown-menu').should('contain', 'Dragon Mountain Park').click()
        cy.get('.search-results-list')
            .should('contain','1')
        cy.contains('.underline-hover', 'Dragon Mountain Park').click()
        cy.get('.grey-background')
            .should('contain', 'Park overview')
    })

    //Trouver un parc grâce au formulaire de recherche (indiquer la ville)
    it('find a park using search form (enter city)', () => {
        cy.get('#city-search-typeahead').type('Kelowna')
        cy.get('.dropdown-menu').find('.dropdown-item').eq(1)
            .should('contain', 'West')
        cy.get('.MuiButtonBase-root').click()
        cy.get('.result-count-text')
            .should('contain', '28')
    })
    //vérifier l'autorisation d'utilisation du parc
    it.only('check the park use-permit', () => {
        cy.contains('.menu-button--unselected','Park-use permits').click()
        cy.get('.menu-level--1')
        cy.contains('.menu-button__title', 'Permit information').click()
        cy.get('.no-gutters')
            .should('contain', 'BC Parks park-use permit information')
        cy.contains('.MuiBreadcrumbs-li', 'Park-use permits').click()
        cy.get('.bcp-landing-intro__text').should('contain', 'Park-use permits')
        cy.contains('.card-body', 'Travel trade').find('.card-button').click()
        cy.get('.no-gutters').should('contain', 'BC Parks travel trade information')
    

        
    })
    //Vérifier l'acce ssibilité du blog
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
