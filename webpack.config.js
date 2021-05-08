const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: 'app.[contenthash].js',
    sourceMapFilename: 'app.[contenthash].js.map',
    path: path.resolve(__dirname + '/build'),
  },
  devtool: 'source-map',
  devServer: {
    open: true,
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
          process.env.NODE_ENV === 'production'
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
            options: { minimize: true },
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
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: `[name].[contenthash].css` })]
      : []),
  ],
  mode: 'development',
}
