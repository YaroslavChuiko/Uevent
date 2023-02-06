import dotenv from 'dotenv';
import initializeApp from './server';
import validateEnv from './validation/env';

dotenv.config();
validateEnv();

initializeApp();
