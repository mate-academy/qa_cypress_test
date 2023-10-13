const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + 'My' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            invalidUsername: '.!@ #$ ><',
            shortPassword: `${randomNumber}`,
            invalidEmail: `${randomNumber}`,
            bio: faker.lorem.lines(),
            updatePassw: 'Trewq4321!',
            updateEmail: 'UpdateEmail@g.com'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            editedTitle: 'edit' + faker.lorem.word(),
            editedDescr: 'edit' + faker.lorem.words(),
            editedBody: 'edit' + faker.lorem.words()
          };
        },
        'db:clear'() {
          clear();

          return null;
        },
        'db:seed'() {
          seed();

          return null;
        }
      });
      addMatchImageSnapshotPlugin(on, config);
    }
  }
});
