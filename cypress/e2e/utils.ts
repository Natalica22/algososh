/// <reference types="cypress" />

import { CIRCLE_CIRCLE, CIRCLE_HEAD, CIRCLE_TAIL, CIRCLE_TEXT, DEFAULT_STATE } from "../constants"

export class Cicle {
  constructor(
    public letter: string | null = null,
    public className: string = DEFAULT_STATE,
    public topText: string | null = null,
    public bottomText: string | null = null
  ) { }
}

const checkCircle = (
  elem: JQuery<HTMLElement>,
  cicle: Cicle) => {
  if (cicle.letter) {
    cy.wrap(elem)
      .find(CIRCLE_TEXT)
      .should('have.text', cicle.letter);
  } else {
    cy.wrap(elem)
      .find(CIRCLE_TEXT)
      .should('not.have.text');
  }

  cy.wrap(elem)
    .find(CIRCLE_CIRCLE)
    .invoke('attr', 'class')
    .then(c => expect(c).contains(cicle.className));

  if (cicle.topText) {
    cy.wrap(elem)
      .find(CIRCLE_HEAD)
      .should('have.text', cicle.topText);
  }

  if (cicle.bottomText) {
    cy.wrap(elem)
      .find(CIRCLE_TAIL)
      .should('have.text', cicle.bottomText);
  }
}

export const checkCircles = (
  parent: JQuery<HTMLElement>,
  cicles: Cicle[]) => {

  cy.wrap(parent).children().each((elem, i) => {
    checkCircle(elem, cicles[i]);
  });
}