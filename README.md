# Project 2 in nanodegree


## To run the project

Firstly you need to install the packages using:

`npm install`

Then kindly go to the PSQL and create 2 DBs with the names (store_api_dev, store_api_test).

You can create them using the below Code

**Create user**

```shell
CREATE USER full_stack_user WITH PASSWORD 'password1234';
```

**Create Databases**

```shell
#Dev Database
CREATE DATABASE store_api_dev;

#Dev Database
CREATE DATABASE store_api_test;
```


**GRANT all privileges to the user in the created databases**

```shell
GRANT ALL PRIVILEGES ON DATABASE store_api_dev TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO full_stack_user;
```



Then, you have to change the .env file to match your database credentials (Username, password, host, etc...).

Notice that the database port is 5432, and backend port is 3000, all these settings can be changed in the .env file

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`

`npm run watch`

