module.exports = {
  sourceType: "unambiguous",
  sourceMaps: true,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 100,
          safari: 15,
          firefox: 91,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [],
};
