/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, DEFAULT_STATE, MODIFIED_STATE } from "../constants";
import { checkCircles } from "./utils";

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
        ['1', '2', '3', '4'],
        [DEFAULT_STATE, DEFAULT_STATE, DEFAULT_STATE, DEFAULT_STATE]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem, 
        ['1', '2', '3', '4'],
        [CHANGING_STATE, DEFAULT_STATE, DEFAULT_STATE, CHANGING_STATE]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem, 
        ['4', '2', '3', '1'],
        [MODIFIED_STATE, CHANGING_STATE, CHANGING_STATE, MODIFIED_STATE]);
    });
    cy.wait(1000);

    cy.get(CIRCLES).then(elem => {
      checkCircles(elem, 
        ['4', '3', '2', '1'],
        [MODIFIED_STATE, MODIFIED_STATE, MODIFIED_STATE, MODIFIED_STATE]);
    });
  });
});
