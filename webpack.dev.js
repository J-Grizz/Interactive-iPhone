const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  mode: "development",
  devtool: "none",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
});