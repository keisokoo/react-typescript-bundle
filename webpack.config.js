const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getClientEnvironment = require('./scripts/env')
const env = getClientEnvironment()

const node_env = process.env.NODE_ENV ?? 'development'
const isDev = node_env === 'development'
const isProd = node_env === 'production'

module.exports = {
  mode: node_env,
  entry: './src/index.tsx',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    sourceMapFilename: '[name].[contenthash].js.map',
    path: path.resolve(__dirname + '/build'),
  },
  devtool: isDev ? 'cheap-module-source-map' : false,
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    // quiet: true,
    hot: true,
    overlay: false,
    clientLogLevel: 'silent',
    watchContentBase: true,
    contentBase: path.resolve('./public'),
    index: 'index.html',
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new InterpolateHtmlPlugin(HtmlWebPackPlugin, env.raw),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
          }),
        ]
      : []),
  ],
}
