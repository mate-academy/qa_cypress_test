// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
const faker = require('faker');

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      password,
      username
    });
  });

Cypress.Commands.add('login', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:1667/users',
    body: {
      email,
      password,
      username
    }
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.request('POST', '/users', {
    email: faker.internet.email(),
    username: faker.random.word(),
    password: 'Qwerty+123'
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    cy.request('POST', '/articles', {
      article: {
        title,
        description,
        body,
        tags: faker.lorem.word({ length: 1 }),
        author_id: response.body.user.id
      }
    });
  });
});
