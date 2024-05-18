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
            cy.get('.col-md-12 > .row > .row > .col-md-3 > .promo_text > h2').each(($text, index) => {
                const promoSectionTitle = promoSectionTitles[index]
                cy.wrap($text).should('contains.text', promoSectionTitle)
            })

            /*each(($class, index)=>{
                const promoSectionTitle = promoSectionTitles[index]
                cy.wrap($class).should('have.class', 'promo_text').and('have.text', promoSectionTitle)
            })*/
        })

        it('Validate Social Media Icons', () => {
            cy.visit('/')

            const socialMedias = ['Facebook', 'Twitter', 'Linkedin']
            const socialMediaLinks = [
                'http://www.facebook.com',
                'https://twitter.com/',
                'https://uk.linkedin.com/']

            cy.get('.header_block > .social_icons')
                .should('be.visible')
                .find('a')
                .should('have.length', 3)
                .each(($a, index) => {
                    const socialMedia = socialMedias[index]
                    const socialMediaLink = socialMediaLinks[index]
                    cy.wrap($a)
                        .should('have.text', socialMedia)
                        .and('have.attr', 'href', socialMediaLink)
                })
        })

        it('Validate Search Keywords', () => {
            cy.visit('/')

            //Search bar
            cy.get('input[placeholder="Search Keywords"]')
                .should('be.visible')
                .click()
            cy.get('#search_form > .btn-group > .dropdown')
                .should('be.visible').find('li')
                .should('have.length', 10)

            //Search Button
            cy.get('input[placeholder="Search Keywords"]')
                .type('test search button')
            cy.get('.button-in-search')
                .should('be.visible')
                .click()
            cy.get('#keyword')
                .should('be.visible')
                .and('have.value', 'test search button')

        })

        it('Return to main page clicking on the Logo', () => {
            cy.visit('/')

            cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=68"]')
                .click()
            cy.get('.logo')
                .click()
            cy.url()
                .should('eq', 'https://automationteststore.com/')
        })

    })

    context('Home Page - Product part', () => {

        it('Validate product areas', () => {
            cy.visit('/')
            //Featured
            cy.get('#featured')
                .should('be.visible')
                .find('.container-fluid > .block_frame > .heading1')
                .find('span')
                .should('have.length', 2)
                .invoke('text')
                .should('contain', 'Featured')
                .and('contain', 'See Our Most featured Products')

            //Latest Products
            cy.get('#latest')
                .should('be.visible')
                .find('.container-fluid > .block_frame > .heading1')
                .find('span')
                .should('have.length', 2)
                .invoke('text')
                .should('contain', 'Latest Products')
                .and('contain', 'See New Products')

            //Best Sellers
            cy.get('#bestseller')
                .should('be.visible')
                .find('.container-fluid > .block_frame > .heading1')
                .find('span')
                .should('have.length', 2)
                .invoke('text')
                .should('contain', 'Bestsellers')
                .and('contain', 'See Best Selling Products')

            //Specials
            cy.get('#special')
                .should('be.visible')
                .find('.container-fluid > .block_frame > .heading1')
                .find('span')
                .should('have.length', 2)
                .invoke('text')
                .should('contain', 'Specials')
                .and('contain', 'See Products On Sale')
        })

        it('View and Write Review', () => {
            cy.visit('/')

            cy.get('#featured > .container-fluid > .block_frame > .thumbnails > .col-md-3 > .thumbnail')
                .should('be.visible')
                .and('have.length', 4)
                .each(($thumbnail, index) => {
                    cy.wrap($thumbnail)
                        .trigger('mouseover')
                        .find('.shortlinks')
                        .should('have.css', 'display', 'block')
                        .find('a')
                        .invoke('text')
                        .should('contain', 'View')
                        .and('contain', 'Write Review')
                })


            cy.get('#featured > .container-fluid > .block_frame > .thumbnails > .col-md-3 > .thumbnail')
                .first()
                .as('firstThumb')
                .trigger('mouseover')
                .find('.shortlinks')
                .should('have.css', 'display', 'block')
                .within(() => {
                    cy.get('a')
                        .eq(0)
                        .should('have.text', 'View')
                        .click()
                })
            cy.url()
                .should('contain', 'https://automationteststore.com/index.php?rt=product/product&product_id')
            cy.go('back')
            cy.get('@firstThumb')
                .trigger('mouseover')
                .within(() => {

                    cy.get('a')
                        .eq(2)
                        .should('have.text', 'Write Review')
                        .click()
                })
            cy.url()
                .should('contain', 'https://automationteststore.com/index.php?rt=product/product&product_id')
                .and('contain', '#review')
        })

    })

})   