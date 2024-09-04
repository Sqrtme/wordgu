
const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ]
};