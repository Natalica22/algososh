/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, DEFAULT_STATE, MODIFIED_STATE } from "../constants";
import { Circle, checkCircles } from "./utils";

const inputSelector = '[data-testid="input"]';
const buttonSelector = '[data-testid="button"]';

describe('String', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  })

  it('empty input - disabled button', () => {
    cy.get(inputSelector).should('have.value', '');
    cy.get(buttonSelector).should('be.disabled');

    cy.get(inputSelector).type('test');
    cy.get(inputSelector).should('have.value', 'test');
    cy.get(buttonSelector).should('be.enabled');

    cy.get(inputSelector).clear();
    cy.get(inputSelector).should('have.value', '');
    cy.get(buttonSelector).should('be.disabled');
  });

  it('reverse and animation', () => {
    cy.get(inputSelector).type('1234');
    cy.get(buttonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 4);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE),
          new Circle('2', DEFAULT_STATE),
          new Circle('3', DEFAULT_STATE),
          new Circle('4', DEFAULT_STATE)
        ]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', CHANGING_STATE),
          new Circle('2', DEFAULT_STATE),
          new Circle('3', DEFAULT_STATE),
          new Circle('4', CHANGING_STATE)
        ]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('4', MODIFIED_STATE),
          new Circle('2', CHANGING_STATE),
          new Circle('3', CHANGING_STATE),
          new Circle('1', MODIFIED_STATE)
        ]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('4', MODIFIED_STATE),
          new Circle('3', MODIFIED_STATE),
          new Circle('2', MODIFIED_STATE),
          new Circle('1', MODIFIED_STATE)
        ]);
    });
  });
});
