import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const SQL = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      quantity  INTEGER NOT NULL,
      in_stock BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP
    );


    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      userName VARCHAR(50) NOT NULL,
      storeName VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP
    );

`

async function main() {
  console.log("Seeding...");

  const client = new Client({
    connectionString: process.env.DB_CONSTRING,
  });

  try {
    await client.connect();
    await client.query(SQL);
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
}

main();
