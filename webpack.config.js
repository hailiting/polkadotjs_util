const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpack({
      template: "./index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
};
