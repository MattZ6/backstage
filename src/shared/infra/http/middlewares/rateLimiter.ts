import { NextFunction, Request, Response } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import cacheConfig from '@config/cache';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';
import AppError from '@shared/errors/AppError';

const {
  config: { redis: redisConfig },
} = cacheConfig;

const storeClient = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
});

const limiter = new RateLimiterRedis({
  storeClient,
  keyPrefix: 'ratelimit',
  points: 1,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  // TODO: Da pra melhorar seguindo isso
  // https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#dynamic-block-duration

  try {
    await limiter.consume(request.ip);

    return next();
  } catch (e) {
    throw new AppError('Too many requests', EnumStatusCode.TooManyRequests);
  }
}
