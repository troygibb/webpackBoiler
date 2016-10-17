const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'client'),
  style: path.join(__dirname, 'client/styles'),
  build: path.join(__dirname, 'build'),
  vendor: path.join(__dirname, 'client'),
};

const common = {
  target: 'web',
  entry: {
    app: `${PATHS.app}/app.jsx`,
    style: `${PATHS.style}/main.scss`,
    vendor: `${PATHS.vendor}/vendor.js`,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DependencyMap',
      template: `${PATHS.app}/index.ejs`,
    }),
  ],
  module: {
    loaders: [
      {
        test: /.*\.jsx?$/,
        include: PATHS.app,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.style
      },
    ],
  },
  resolve: {
    // Empty string needed.
    extensions: ['', '.js', '.jsx', '.node'],
  },
};

const buildConfig = (previousConfig) => {
  return Object.assign({}, previousConfig);
};

const devConfig = (previousConfig) => {
  return Object.assign({}, previousConfig, {
    entry: {
      app: [
      `${PATHS.app}/app.jsx`, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      `${PATHS.style}/main.scss`, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
      ],
    },
    output: {
      path: PATHS.build,
      filename: '[name].[hash].js',
    },
    devtool: 'source-map',
    plugins: [
      ...previousConfig.plugins,
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  });
};

const TARGET = process.env.npm_lifecycle_event;
const config = TARGET === 'build' ? buildConfig(common) : devConfig(common);
module.exports = validate(config);
