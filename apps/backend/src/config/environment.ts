import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5100,
  nodeEnv: process.env.NODE_ENV || 'development',
};
