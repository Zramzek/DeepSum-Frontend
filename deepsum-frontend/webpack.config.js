const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    signup: "./src/js/signup.js",
    homepage: "./src/js/homepage.js",
    auth_callback: "./src/js/auth_callback.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: "./pages/signup.html",
      filename: "signup.html",
      chunks: ["signup"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./pages/homepage.html",
      filename: "homepage.html",
      chunks: ["homepage"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./pages/auth_callback.html",
      filename: "auth_callback.html",
      chunks: ["auth_callback"],
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/images"),
          to: "images",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/signup/, to: "/signup.html" },
        { from: /^\/homepage/, to: "/homepage.html" },
        { from: /^\/auth/, to: "/auth_callback.html" },
        { from: /./, to: "/signup.html" },
      ],
    },
  },
  mode: "development",
};
