import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, NODE_ENV, POSTGRES_PORT } =
  process.env;
  let client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: <number>(<unknown>POSTGRES_PORT)
  });

console.log(NODE_ENV);

if(NODE_ENV === 'test'){
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: <number>(<unknown>POSTGRES_PORT)
  });
}

export default client;
