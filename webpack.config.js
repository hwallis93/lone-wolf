const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const isProd = process.env.NODE_ENV === "production";
const buildDir = resolve(__dirname, "build");

const sharedConfig = {
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

const clientConfig = {
  ...sharedConfig,
  entry: {
    index: "./src/client/index.tsx",
  },
  output: {
    path: buildDir,
    filename: "client.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

const serverConfig = {
  ...sharedConfig,
  target: "node",
  entry: {
    index: "./src/server/server.ts",
  },
  output: {
    path: buildDir,
    filename: "server.js",
  },
  // externals: [nodeExternals()],
  //   node: {
  //     __dirname: false,
  //     __filename: false,
  //   },
};

module.exports = [clientConfig, serverConfig];
