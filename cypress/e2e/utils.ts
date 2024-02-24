/// <reference types="cypress" />

import { CIRCLE_CIRCLE, CIRCLE_HEAD, CIRCLE_TAIL, CIRCLE_TEXT, DEFAULT_STATE } from "../constants"

export class Circle {
  constructor(
    public letter: string | null = null,
    public className: string = DEFAULT_STATE,
    public topText: string | null = null,
    public bottomText: string | null = null,
    public topCircle: Circle | null = null,
    public bottomCircle: Circle | null = null
  ) { }
}

const checkCircle = (
  elem: JQuery<HTMLElement>,
  circle: Circle) => {
  if (circle.letter) {
    cy.wrap(elem)
      .find(CIRCLE_TEXT)
      .should('have.text', circle.letter);
  } else {
    cy.wrap(elem)
      .find(CIRCLE_TEXT)
      .should('not.have.text');
  }

  cy.wrap(elem)
    .find(CIRCLE_CIRCLE)
    .invoke('attr', 'class')
    .then(c => expect(c).contains(circle.className));

  if (circle.topText) {
    cy.wrap(elem)
      .find(CIRCLE_HEAD)
      .should('have.text', circle.topText);
  }

  if (circle.bottomText) {
    cy.wrap(elem)
      .find(CIRCLE_TAIL)
      .should('have.text', circle.bottomText);
  }

  if (circle.topCircle) {
    cy.wrap(elem)
      .find(CIRCLE_HEAD)
      .then(elem => checkCircle(elem, circle.topCircle as Circle));
  }

  if (circle.bottomCircle) {
    cy.wrap(elem)
      .find(CIRCLE_HEAD)
      .then(elem => checkCircle(elem, circle.bottomCircle as Circle));
  }
}

export const checkCircles = (
  parent: JQuery<HTMLElement>,
  circles: Circle[]) => {

  cy.wrap(parent).children().each((elem, i) => {
    checkCircle(elem, circles[i]);
  });
}