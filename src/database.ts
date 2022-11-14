import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { ENV, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER } =
  process.env;
  let client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });

console.log(ENV);
  if(ENV === 'test'){
    console.log('f34534534545');
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB_TEST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
  }

export default client;
