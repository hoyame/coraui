const path = require('path');
const fivemPath = "./"

module.exports = {
  entry: "./src/client/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "client.js",
    path: path.resolve(fivemPath, "dist/client")
  }
};
