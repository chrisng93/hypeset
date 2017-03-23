/**
 * Created by chrisng on 3/20/17.
 */
import redis from 'redis';
import Promise from 'bluebird';
import env from 'dotenv';

env.config({ path: './.env' });

const client = Promise.promisifyAll(redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST));

client.on('connect', () => {
  console.log('Connected to Redis..');
});

client.on('error', (err) => {
  console.log(`Error connecting to Redis: ${err}`);
});

setInterval(() => {
  console.log('Redis client sending ping..');
  client.ping();
}, 60000);

export default client;
