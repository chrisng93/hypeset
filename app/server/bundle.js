/**
 * Created by chrisng on 4/5/17.
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('../webpack.config.js');
const config = require('../src/constants/config.js');

let HOST;
(config.HOST.indexOf('localhost') === -1 && config.HOST) ? HOST = config.HOST : HOST = '127.0.0.1';
const PORT = config.PORT || 8888;

module.exports = () => {
  let bundleStart = null;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log(`Bundled in ${(Date.now() - bundleStart)} ms!`);
  });

  const bundler = new webpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(PORT, HOST, () => {
    console.log('Bundling project, please wait...');
  })
};
