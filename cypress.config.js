const { defineConfig } = require('cypress');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  generateUserData,
  generateArticle
} = require('./cypress/support/data_generation/generateData');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:1667/`,
    setupNodeEvents(on, config) {
      on('task', {
        generateUserData() {
          return generateUserData();
        },

        generateArticle() {
          return generateArticle();
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
