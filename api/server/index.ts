import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from '../lib/logger';
import router from '../routes';
import errorMiddleware from '../middleware/error';

const initializeApp = () => {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PUT, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization, Set-Cookie',
    }),
  );

  app.use(router);

  app.use(errorMiddleware);

  app
    .listen(process.env.SERVER_PORT, () => {
      logger.info(`The server is running on port ${process.env.SERVER_PORT}`);
    })
    .on('error', (err) => logger.error(err.message));
};

export default initializeApp;
