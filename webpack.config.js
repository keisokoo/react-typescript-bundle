process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
process.on('unhandledRejection', (err) => {
  throw err
})

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  output: {
    filename: isProd
      ? 'static/js/[name].[contenthash:8].js'
      : isDev && 'static/js/bundle.js',
    sourceMapFilename: '[name].[contenthash].js.map',
    path: path.resolve(__dirname + '/build'),
    chunkFilename: isProd
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isDev && 'static/js/[name].chunk.js',
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    client: {
      overlay: false,
    },
    watchFiles: ['public/**/*'],
    static: [path.resolve('./public')],
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
    new HtmlWebPackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: 'public/index.html',
        },
        isProd
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),
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
