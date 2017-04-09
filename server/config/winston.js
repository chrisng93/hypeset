/**
 * Create loggers
 */

const logLevel = process.env.LOG_LEVEL;

module.exports = (winston) => {
  // using npm logging hierarchy in order from most to least important:
  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  winston.remove(winston.transports.Console);

  // configure options
  const options = {
    timestamp: true,
    colorize: true,
    level: logLevel,
  };
  winston.add(winston.transports.Console, options);

  // configure logger categories
  const categories = ['app', 'auth', 'scripts', 'postgres', 'redis', 'analyticsApi', 'brandApi',
    'infoApi', 'meApi', 'siteApi', 'userApi'];
  categories.forEach(category => winston.loggers.add(category, { console: { ...options, label: category } }));
};
