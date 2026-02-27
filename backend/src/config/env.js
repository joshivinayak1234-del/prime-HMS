import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://hms_user:hms_password@localhost:5432/hms_db',
};
