import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, NODE_ENV } =
  process.env;
  let client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });

console.log(NODE_ENV);

if(NODE_ENV === 'test'){
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
