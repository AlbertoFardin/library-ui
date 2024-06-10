const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    compress: true,
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        include: [path.resolve(__dirname, "../json")],
        loader: "json-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
