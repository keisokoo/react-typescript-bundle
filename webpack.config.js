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

const node_env = process.env.NODE_ENV ?? 'development'

module.exports = {
  mode: node_env,
  entry: './src/index.tsx',
  optimization: {
    minimize: node_env === 'production',
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  output: {
    filename:
      node_env === 'production'
        ? 'static/js/[name].[contenthash:8].js'
        : node_env === 'development' && 'static/js/bundle.js',
    sourceMapFilename: '[name].[contenthash].js.map',
    path: path.resolve(__dirname + '/build'),
    chunkFilename:
      node_env === 'production'
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : node_env === 'development' && 'static/js/[name].chunk.js',
  },
  devtool: node_env === 'production' ? false : 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    client: {
      overlay: false,
    },
    watchFiles: ['public/**/*'],
    static: [path.resolve('./build')],
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
          node_env === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
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
        node_env === 'production'
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
    ...(node_env === 'production'
      ? [
          new MiniCssExtractPlugin({
            filename:
              node_env === 'development'
                ? '[name].css'
                : '[name].[contenthash].css',
            chunkFilename:
              node_env === 'development'
                ? '[id].css'
                : '[id].[contenthash].css',
          }),
        ]
      : []),
  ],
}
