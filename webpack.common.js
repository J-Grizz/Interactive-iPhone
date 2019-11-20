const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/scripts/*.js"),
  module: {
    rules: [
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