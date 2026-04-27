import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.PORT,
})

export default pool;