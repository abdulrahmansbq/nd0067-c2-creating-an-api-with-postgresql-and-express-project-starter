# Project 2 in nanodegree


## To run the project

Firstly you need to install the packages using:

`npm install`

Then kindly go to the PSQL and create 2 DBs with the names (store_api_dev, store_api_test).

Then, you have to change the .env file to match your database credentials (Username, password, host, etc...).

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`

`npm run watch`

