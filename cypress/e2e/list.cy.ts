/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, CIRCLE_TEXT, DEFAULT_STATE, MODIFIED_STATE } from "../constants";
import { Circle, checkCircles } from "./utils";

const inputTextSelector = '[data-testid="inputText"]';
const prependButtonSelector = '[data-testid="prependButton"]';
const appendButtonSelector = '[data-testid="appendButton"]';
const deleteHeadButtonSelector = '[data-testid="deleteHeadButton"]';
const deleteTailButtonSelector = '[data-testid="deleteTailButton"]';
const inputIndexSelector = '[data-testid="inputIndex"]';
const addByIndexButtonSelector = '[data-testid="addByIndexButton"]';
const deleteByIndexButtonSelector = '[data-testid="deleteByIndexButton"]';

describe('List', () => {
  beforeEach(() => {
    cy.visit('/list');
  })

  it('empty input - disabled add button', () => {
    cy.get(inputTextSelector).should('have.value', '');
    cy.get(prependButtonSelector).should('be.disabled');
    cy.get(appendButtonSelector).should('be.disabled');
    cy.get(addByIndexButtonSelector).should('be.disabled');
    cy.get(deleteByIndexButtonSelector).should('be.disabled');

    cy.get(inputTextSelector).type('test');
    cy.get(inputTextSelector).should('have.value', 'test');
    cy.get(prependButtonSelector).should('be.enabled');
    cy.get(appendButtonSelector).should('be.enabled');
    cy.get(addByIndexButtonSelector).should('be.disabled');
    cy.get(deleteByIndexButtonSelector).should('be.disabled');

    cy.get(inputIndexSelector).type('1');
    cy.get(inputIndexSelector).should('have.value', '1');
    cy.get(prependButtonSelector).should('be.enabled');
    cy.get(appendButtonSelector).should('be.enabled');
    cy.get(addByIndexButtonSelector).should('be.enabled');
    cy.get(deleteByIndexButtonSelector).should('be.enabled');

    cy.get(inputTextSelector).clear();
    cy.get(inputTextSelector).should('have.value', '');
    cy.get(prependButtonSelector).should('be.disabled');
    cy.get(appendButtonSelector).should('be.disabled');
    cy.get(addByIndexButtonSelector).should('be.disabled');
    cy.get(deleteByIndexButtonSelector).should('be.enabled');
  });

  it('default', () => {
    cy.get(CIRCLES).children()
      .should('have.length.at.least', 3).and('have.length.at.most', 6);
  });

  it('prepend', () => {
    const initialData: string[] = [];
    cy.get(CIRCLES).children().find(CIRCLE_TEXT).each(t => {
      initialData.push(t.text());
    });

    cy.get(inputTextSelector).type('999');
    cy.get(prependButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle(initialData[0], DEFAULT_STATE, null, null, new Circle('999', CHANGING_STATE)),
          ...initialData.slice(1).map((x, i) => {
            return new Circle(x, DEFAULT_STATE, null, i === initialData.length ? 'tail' : null)
          })
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('999', MODIFIED_STATE, 'head'),
          ...initialData.map((x, i) => {
            return new Circle(x, DEFAULT_STATE, null, i === initialData.length ? 'tail' : null)
          })
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          new Circle('999', DEFAULT_STATE, 'head'),
          ...initialData.map((x, i) => {
            return new Circle(x, DEFAULT_STATE, null, i === initialData.length - 1 ? 'tail' : null)
          })
        ]);
    });
  });

  it('append', () => {
    const initialData: string[] = [];
    cy.get(CIRCLES).children().find(CIRCLE_TEXT).each(t => {
      initialData.push(t.text());
    });

    cy.get(inputTextSelector).type('999');
    cy.get(appendButtonSelector).click();
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          ...initialData.slice(0, initialData.length - 1).map((x, i) => {
            return new Circle(x, DEFAULT_STATE, i === 0 ? 'head' : null)
          }),
          new Circle(initialData[initialData.length - 1], DEFAULT_STATE, null, 'tail', new Circle('999', CHANGING_STATE))
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          ...initialData.map((x, i) => {
            return new Circle(x, DEFAULT_STATE, i === 0 ? 'head' : null)
          }),
          new Circle('999', MODIFIED_STATE, null, 'tail')
        ]);
    });
    cy.wait(500);
    cy.get(CIRCLES).then(elem => {
      checkCircles(elem,
        [
          ...initialData.map((x, i) => {
            return new Circle(x, DEFAULT_STATE, i === 0 ? 'head' : null)
          }),
          new Circle('999', DEFAULT_STATE, null, 'tail')
        ]);
    });
  });
});