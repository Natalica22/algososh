/// <reference types="cypress" />

describe('Application', () => {
  it('should be available', () => {
    cy.visit('');
    cy.contains('МБОУ АЛГОСОШ');
  });
});