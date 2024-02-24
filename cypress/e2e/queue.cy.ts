/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, DEFAULT_STATE } from "../constants";
import { Circle, checkCircles } from "./utils";

const inputSelector = '[data-testid="input"]';
const addButtonSelector = '[data-testid="addButton"]';
const deleteButtonSelector = '[data-testid="deleteButton"]';
const clearButtonSelector = '[data-testid="clearButton"]';

describe('Queue', () => {
  beforeEach(() => {
    cy.visit('/queue');
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
    cy.get(CIRCLES).children().should('have.length', 7);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', CHANGING_STATE, 'head', 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE, 'head', 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });

    cy.get(inputSelector).type('2');
    cy.get(addButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE, 'head'),
          new Circle('2', CHANGING_STATE, null, 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE, 'head'),
          new Circle('2', DEFAULT_STATE, null, 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
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
    cy.get(CIRCLES).children().should('have.length', 7);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE, 'head'),
          new Circle('2', DEFAULT_STATE, null, 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });

    cy.get(deleteButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', CHANGING_STATE, 'head'),
          new Circle('2', DEFAULT_STATE, null, 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle(),
          new Circle('2', DEFAULT_STATE, 'head', 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
    
    cy.get(deleteButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle(),
          new Circle('2', CHANGING_STATE, 'head', 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle(),
          new Circle(null, DEFAULT_STATE, 'head'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
  });

  it('clear elems - animation', () => {
    cy.get(inputSelector).type('1');
    cy.get(addButtonSelector).click();
    cy.wait(1000);
    cy.get(inputSelector).type('2');
    cy.get(addButtonSelector).click();
    cy.wait(1000);
    cy.get(CIRCLES).children().should('have.length', 7);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('1', DEFAULT_STATE, 'head'),
          new Circle('2', DEFAULT_STATE, null, 'tail'),
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });

    cy.get(clearButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle(), new Circle(), new Circle(), new Circle(), new Circle(), new Circle(), new Circle()
        ]);
    });
  });
});