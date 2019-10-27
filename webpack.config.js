const path = require("path");
module.exports = {
  mode: "development",
  devtool: "none",
  entry: [
    "./public/scripts/phone.js",
    "./public/scripts/calculator.js",
    "./public/scripts/video-player.js",
    "./public/scripts/temp-converter.js",
    "./public/scripts/color-game.js",
    "./public/scripts/camera-app.js",
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}