const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    alpha: './src/alpha.js',
    beta: './src/beta.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      // --- css ---
      {
        test: /\.css$/,
        // use extract text plugin in prod only
        use: process.env.NODE_ENV === 'production'
          ? ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader?modules'],
            })
          : ['style-loader', 'css-loader?modules'],
      },
      // --- images ---
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      // --- fonts ---
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ title: 'GSW Theme Development' }),
    new ExtractTextWebpackPlugin({ filename: '[name].css' }),
  ],
};
