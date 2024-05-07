/// <reference types="cypress"/>

describe('Home Page', () => {
  it('Page should be On', () => {
    cy.visit('/')
  })
})