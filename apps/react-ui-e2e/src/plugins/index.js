// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', () => {
    // config.env.tsConfig = config.fileServerFolder + '/tsconfig.e2e.json'
    config.env.tsConfig = '/__w/multi-cart/multi-cart/apps/react-ui-e2e/tsconfig.e2e.json';
    // if (!config.env.tsConfig) {
    //   config.env.tsConfig = config.fileServerFolder + '/tsconfig.e2e.json';
    // }
    // config.env.webpackFilename = './cypress/webpack.config.js' // or path to your webpack.config.js
    // require('cypress-react-unit-test/plugins/load-webpack')(on, config)
    // return config
    return preprocessTypescript(config);
  });
};

