const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/scripts/*.js"),
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/imgs/"
          }
        }
      },
      {
        test: /\.mp3$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/sounds/"
          }
        }
      }
    ]
  },
}