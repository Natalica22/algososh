/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, DEFAULT_STATE } from "../constants";
import { Cicle, checkCircles } from "./utils";

const inputSelector = '[data-testid="input"]';
const addButtonSelector = '[data-testid="addButton"]';
const deleteButtonSelector = '[data-testid="deleteButton"]';
const clearButtonSelector = '[data-testid="clearButton"]';

describe('Stack', () => {
  beforeEach(() => {
    cy.visit('/stack');
  })

  it('empty input - disabled add button', () => {
    cy.get(inputSelector).should('have.value', '');
    cy.get(addButtonSelector).should('be.disabled');

    cy.get(inputSelector).type('test');
    cy.get(inputSelector).should('have.value', 'test');
    cy.get(addButtonSelector).should('be.enabled');

    cy.get(inputSelector).clear();
    cy.get(inputSelector).should('have.value', '');
    cy.get(addButtonSelector).should('be.disabled');
  });

  it('add elems - animation', () => {
    cy.get(inputSelector).type('1');
    cy.get(addButtonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 1);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE, 'top')
        ]);
    });

    cy.get(inputSelector).type('2');
    cy.get(addButtonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 2);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE, 'top')
        ]);
    });

    cy.get(inputSelector).type('3');
    cy.get(addButtonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 3);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE, 'top')
        ]);
    });
  });

  it('delete elems - animation', () => {
    cy.get(inputSelector).type('1');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(inputSelector).type('2');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(inputSelector).type('3');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(CIRCLES).children().should('have.length', 3);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE, 'top')
        ]);
    });

    cy.get(deleteButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE, 'top')
        ]);
    });
    cy.get(CIRCLES).children().should('have.length', 2);

    cy.get(deleteButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE, 'top')
        ]);
    });
    cy.get(CIRCLES).children().should('have.length', 1);

    cy.get(deleteButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', CHANGING_STATE, 'top')
        ]);
    });
    cy.wait(500);

    cy.get(CIRCLES).children().should('have.length', 0);
  });

  it('clear elems - animation', () => {
    cy.get(inputSelector).type('1');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(inputSelector).type('2');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(inputSelector).type('3');
    cy.get(addButtonSelector).click();
    cy.wait(1000);

    cy.get(CIRCLES).children().should('have.length', 3);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Cicle('1', DEFAULT_STATE),
          new Cicle('2', DEFAULT_STATE),
          new Cicle('3', DEFAULT_STATE, 'top')
        ]);
    });

    cy.get(clearButtonSelector).click();

    cy.get(CIRCLES).children().should('have.length', 0);
  });
});