// .storybook/main.js

const path = require("path");

// your app's webpack.config.js
const custom = require("./webpack.config.js");

module.exports = {
  stories: [
    "../src/Welcome.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-actions", "@storybook/addon-essentials"],
  typescript: {
    check: true,
    configFile: "tsconfig.json",
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  webpackFinal: async (config) => {
    return {
      ...config,
      devtool: "source-map",
      module: {
        ...config.module,
        rules: [].concat(config.module.rules),
      },
    };
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
