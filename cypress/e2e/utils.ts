/// <reference types="cypress" />

import { CIRCLE_CIRCLE, CIRCLE_TEXT } from "../constants"


const checkCircle = (
  elem: JQuery<HTMLElement>,
  text: string,
  className: string) => {

    cy.wrap(elem)
      .find(CIRCLE_TEXT)
      .should('have.text', text);

    cy.wrap(elem)
      .find(CIRCLE_CIRCLE)
      .invoke('attr', 'class')
      .then(c => expect(c).contains(className));
}

export const checkCircles = (
  parent: JQuery<HTMLElement>,
  texts: string[],
  classNames: string[]) => {
  
    cy.wrap(parent).children().each((elem, i) => {
      checkCircle(elem, texts[i], classNames[i]);
    });
}