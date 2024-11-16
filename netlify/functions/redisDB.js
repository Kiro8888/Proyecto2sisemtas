const Redis = require('ioredis');

const redis = new Redis({
  host: 'redis-12774.c11.us-east-1-3.ec2.redns.redis-cloud.com',
  port: 12774,
  password: 'uzLm3fQ4EFlzJRbtkyECN03LTKVn50fq'
});

module.exports = redis;
