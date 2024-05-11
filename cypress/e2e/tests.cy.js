/// <reference types="cypress"/>

describe('Home Page', () => {

    context('Home Page - Top part', () => {

        it('Validate HOME menu selected', () => {
            cy.visit('/')
            //background collor: #00A1CB
            cy.get('.nav-pills > :nth-child(1) > .active')
                .should('be.visible')
                .should('have.css', 'background-color')
                .and('eq', 'rgb(0, 161, 203)')

        })

        it('Validate Cart empty', () => {
            cy.visit('/')

            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle > .cart_total')
                .should('be.visible')
                .should('have.text', '$0.00')

        })

        it('Validate Currency Options', () => {
            cy.visit('/')

            //USD should be default
            //3 options: USD, EUR, PE
            const expectedCurrencies = ['€ Euro', '£ Pound Sterling', '$ US Dollar']

            cy.get('.block_6 > .nav > .dropdown')
                .should('be.visible')

            cy.get('.block_6 > .nav > .dropdown > .dropdown-toggle')
                .should('have.text', '$ US Dollar')

            cy.get('.block_6 > .nav > .dropdown > .dropdown-menu')
                .find('li').should('have.length', 3)
                .each(($li, index) => {
                    const expectedCurrency = expectedCurrencies[index]
                    cy.wrap($li).should('contain.text', expectedCurrency)
                })

        })
        
        it('Validate all Menu Options', () => {
            cy.visit('/')
            /*Each menu:
            cy.get('.nav-pills  > :nth-child(2)') ----> Apparel and accessories / url final: 68
            cy.get('.nav-pills > :nth-child(3)') ----> Makeup                   / url final: 36
            cy.get('.nav-pills > :nth-child(4)') ----> Skincare                 / url final: 43
            cy.get('.nav-pills > :nth-child(5)') ----> Fragrance                / url final: 49
            cy.get('.nav-pills > :nth-child(6)') ----> Men                      / url final: 58
            cy.get('.nav-pills > :nth-child(7)') ----> Hair care                / url final: 52
            cy.get('.nav-pills > :nth-child(8)') ----> Books                    / url final: 65
            */

            const menuTitles = ['Home', 'Apparel & accessories', 'Makeup', 'Skincare', 'Fragrance', 'Men', 'Hair Care', 'Books']

            cy.get('.nav-pills > li')
                .should('be.visible')
                .should('have.length', 8)
                .each(($li, index) => {
                    const menuTitle = menuTitles[index]
                    cy.wrap($li).should('contain.text', menuTitle)
                })

            //Validate if when clicked, It'll redirect to the correct page
            /*const menuPageTitles = ['Apparel & accessories', 'Makeup', 'Skincare', 'Fragrance', 'Men', 'Hair Care', 'Books']
            cy.get('.nav-pills > li')
                .each(($li, index) => {
                    if (index >= 1) {
                        const menuPageTitle = menuPageTitles[index - 1]
                        cy.wrap($li).click('center')
                        cy.wait(5000)
                        cy.title()
                            .should('eq', menuPageTitle)
                    }
                })*/

        })

        it('Validate 3 slides', () => {
            cy.visit('/')

            //validating qtt of slides
            cy.get('.oneByOneSlide > #banner_slides > .oneByOne_item')
            .should('have.length', 3)
            
            //validate arrow buttons
            //Previous Arrow click
            cy.get('.oneByOneSlide')
            .trigger('mouseover')
            cy.get('.prevArrow').should('be.visible')
            .click()
            .should('have.css', 'display')
            .end('eq', 'block')
            //Next Arrow click
            cy.get('.nextArrow')
            .should('be.visible')
            .click()
            .should('have.css', 'display')
            .end('eq', 'block')

        })

        it('Validate Red Message under the Slides', () => {
            cy.visit('/')

            //Color = #D13614 / in RGB = (209, 54, 20)
            cy.get('.welcome_msg')
            .should('be.visible')
            .and('contain.text', 'Welcome to the Automation Test Store! ')

            cy.get('.welcome_msg > h4')
            .and('have.css', 'color')
            .and('eq', 'rgb(209, 54, 20)')

        })

        it('Validate Promo Block', () => {
            cy.visit('/')

            const promoSectionTitles = ['Fast shipping', 'Easy Payments', 'Shipping Options', 'Large Variety']
            //Count Icons
            cy.get('.col-md-12 > .row > .row > .col-md-3')
            .should('be.visible').should('have.length', 4)
            //Validate each title
            cy.get('.col-md-12 > .row > .row > .col-md-3 > .promo_text > h2').each(($text, index)=>{
                const promoSectionTitle = promoSectionTitles[index]
                cy.wrap($text).should('contains.text', promoSectionTitle)
            })
            
            /*each(($class, index)=>{
                const promoSectionTitle = promoSectionTitles[index]
                cy.wrap($class).should('have.class', 'promo_text').and('have.text', promoSectionTitle)
            })*/
        })

       /* it('Validate Social Media Icons', () => {
            cy.visit('/')
            cy.get('').should('be.visible')

        })

      //  it('Validate Search Keywords', () => {
            cy.visit('/')
            cy.get('').should('be.visible')

        })*/

    })

    //Validate background color
})   