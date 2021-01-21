import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(EnumStatusCode.InternalServerError).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333!');
});
