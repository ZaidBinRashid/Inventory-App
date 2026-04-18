import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.PORT,
  database: process.env.DB_NAME,
})

export default pool;