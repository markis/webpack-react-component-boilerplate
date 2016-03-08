/* eslint-env node */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  contentBase: config.devServer.contentBase,
  hot: true,
  stats: {
    colors: true
  }
});

server.listen(8080, 'localhost',  err => { //eslint-disable-line
  if (err) {
    throw new Error(err);
  }
  console.log('Listening at localhost:8080'); //eslint-disable-line
});
