import bodyParser from 'body-parser';

module.exports = (app, express) => {
  // body parser for getting info from post and/or url params
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // enable cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });
};
