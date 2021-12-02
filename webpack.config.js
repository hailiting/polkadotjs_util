const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
const webpack = require("webpack");
const config = require("./config");
module.exports = {
  mode: "development",
  entry: "./src/index.ts",

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
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "app/public"),
    filename: "[name].js",
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
  },
};
