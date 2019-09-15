const path = require("path");
const fs = require('fs');
const nodeExternals = require('webpack-node-externals')

const time = new Date().getTime()

module.exports = {
  mode: 'development',
  entry: "./server/src/bin/www",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `bundle.min.js?v=${time}`
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()]
};
