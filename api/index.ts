import dotenv from 'dotenv';
import logger from './lib/logger';
import initializeApp from './server';
import Admin from './services/admin';

dotenv.config();

Admin.createIfNotExists().catch((e) => logger.error(e));
initializeApp();
