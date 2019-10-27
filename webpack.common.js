const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "./public/scripts/phone.js",
    "./public/scripts/calculator.js",
    "./public/scripts/video-player.js",
    "./public/scripts/temp-converter.js",
    "./public/scripts/color-game.js",
    "./public/scripts/camera-app.js",
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}