// thx: https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config
// thx: https://github.com/chakra-ui/chakra-ui/blob/main/.storybook/main.js#L22-L23
const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  addons: ['@storybook/addon-knobs'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
