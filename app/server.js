/**
 * Created by chrisng on 4/5/17.
 */
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const config = require('./src/constants/config.js');

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});
const app = express();

const isProduction = config.NODE_ENV === 'production';
const HOST = config.HOST;
const PORT = isProduction ? config.PORT : 8888;
const publicPath = path.resolve(__dirname, 'public');

// point to our static assets
app.use(express.static(publicPath));

if (!isProduction) {
  const bundle = require('./server/bundle.js');
  bundle();

  app.all('/build/*', (req, res) => {
    proxy.web(req, res, { target: `${HOST}:${PORT}` });
  });
}

proxy.on('error', (err) => console.log(`Could not connect to proxy: ${err}`));

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
