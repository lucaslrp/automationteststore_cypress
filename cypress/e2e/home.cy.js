/// <reference types="cypress"/>

describe('Home Page', () => {
  it('Page should be On', () => {
    cy.visit('/')

    cy.title()
      .should('eq', 'A place to practice your automation skills!')
  })
})