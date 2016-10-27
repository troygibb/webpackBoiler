const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

const TARGET = process.env.npm_lifecycle_event;

if (TARGET !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'build.js',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
    noInfo: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`Listening on the magical port http://localhost:${port}`));
