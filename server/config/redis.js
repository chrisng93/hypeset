/**
 * Created by chrisng on 3/20/17.
 */
import redis from 'redis';
import env from 'dotenv';

env.config({ path: './.env' });

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
client.on('connect', () => {
  console.log('Connected to Redis..');
});

export default client;
