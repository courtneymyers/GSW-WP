const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

// common webpack config
const common = {
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ title: 'GSW Theme Development' }),
  ],
};

// development webpack config
if (TARGET === 'start') {
  module.exports = merge.smart(common, {
    devtool: 'inline-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}

// production webpack config
if (TARGET === 'build') {
  module.exports = merge.smart(common, {
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules'],
          }),
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),
      new ExtractTextWebpackPlugin({ filename: '[name].css' }),
      new UglifyJSPlugin({ sourceMap: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
  });
}
