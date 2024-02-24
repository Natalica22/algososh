/// <reference types="cypress" />

import { CHANGING_STATE, CIRCLES, DEFAULT_STATE } from "../constants";
import { Cicle, checkCircles } from "./utils";

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

  it('delete elems - animation', () => {

  });

  it('clear elems - animation', () => {

  });
});