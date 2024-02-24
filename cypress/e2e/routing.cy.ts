/// <reference types="cypress" />

describe('Routing', () => {
  beforeEach(() => {
    cy.visit('');
  })

  it('visit string', () => {
    cy.visit('/recursion');
    cy.contains('Строка');
  });

  it('visit fibonacci', () => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('visit sorting', () => {
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
  });

  it('visit stack', () => {
    cy.visit('/stack');
    cy.contains('Стек');
  });

  it('visit queue', () => {
    cy.visit('/queue');
    cy.contains('Очередь');
  });

  it('visit list', () => {
    cy.visit('/list');
    cy.contains('Связный список');
  });
});