CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName int NOT NULL,
  lastName varchar(50) NOT NULL,
  password varchar(255) NOT NULL
);
