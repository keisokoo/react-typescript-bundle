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
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  output: {
    filename: 'app.[contenthash].js',
    sourceMapFilename: 'app.[contenthash].js.map',
    path: path.resolve(__dirname + '/build'),
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    quiet: true,
    overlay: false,
    clientLogLevel: 'none',
    watchContentBase: true,
    contentBase: path.resolve('./build'),
    index: 'index.html',
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
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
        use: [
          {
            loader: 'html-loader',
            options: { minimize: node_env === 'production' },
          },
        ],
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
      filename: 'index.html',
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    ...(node_env === 'production'
      ? [new MiniCssExtractPlugin({ filename: `[name].[contenthash].css` })]
      : []),
  ],
}
