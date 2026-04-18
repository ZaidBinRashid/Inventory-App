import { Client } from  "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });



const SQL = `

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