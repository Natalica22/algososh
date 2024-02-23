/// <reference types="cypress" />

import { CIRCLES, DEFAULT_STATE } from "../constants";
import { Cicle, checkCircles } from "./utils";

const inputSelector = '[data-testid="input"]';
const buttonSelector = '[data-testid="button"]';

describe('Fibonacci', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  })

  it('empty input - disabled button', () => {
    cy.get(inputSelector).should('have.value', '');
    cy.get(buttonSelector).should('be.disabled');

    cy.get(inputSelector).type('5');
    cy.get(inputSelector).should('have.value', '5');
    cy.get(buttonSelector).should('be.enabled');

    cy.get(inputSelector).clear();
    cy.get(inputSelector).should('have.value', '');
    cy.get(buttonSelector).should('be.disabled');
  });

  it('generation', () => {
    cy.get(inputSelector).type('5');
    cy.get(buttonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 1);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE)
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 2);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem, 
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('1', DEFAULT_STATE)
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 3);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE)
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 4);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE)
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 5);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE),
          new Cicle('5', DEFAULT_STATE)
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 6);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE),
          new Cicle('5', DEFAULT_STATE),
          new Cicle('8', DEFAULT_STATE)
        ]);
    });
  });
});