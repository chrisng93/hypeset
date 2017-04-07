/**
 * Created by chrisng on 3/20/17.
 */
import redis from 'redis';
import Promise from 'bluebird';
import winston from 'winston';

const logger = winston.loggers.get('redis');

const client = Promise.promisifyAll(redis.createClient({ host: 'redis' }));

client.on('connect', () => logger.info('Connected to Redis', { action: 'connect' }));

client.on('error', (err) => logger.error('Error with Redis', { err: JSON.stringify(err) }));

setInterval(() => {
  logger.debug('Redis pinging', { action: 'ping' });
  client.ping();
}, 60000);

export default client;
