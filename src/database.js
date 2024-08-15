import { createPool } from 'mysql2/promise';
//  Environments
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname ,  '../', 'environments' , 'environment.env')
});

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // connectionLimit: 10,
  // charset: 'utf8mb4_unicode_ci',
  // timezone: 'UTC',
  // multipleStatements: true,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default pool;

