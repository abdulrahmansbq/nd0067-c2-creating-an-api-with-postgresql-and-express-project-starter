# API Requirements
The company stakeholders want to create an online storefront to showcase their
great product ideas. Users need to be able to browse an index of all products,
see the specifics of a single product, and add products to an order that they
can view in a cart page. You have been tasked with building the API that will
support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what
endpoints the API needs to supply, as well as data shapes the frontend and backend
have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
    - 'products' [GET]
- Show
    - 'products/:id' [GET]
- Create [token required]
    - 'products' [POST] [with authorization token as a header]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
    - 'users' [GET]
- Show [token required]
    - 'users/:id' [GET]
- Create N[token required]
    - 'users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
    - 'order' [GET] [with authorization token as a header]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price FLOAT NOT NULL
);
```


#### User
- id
- firstName
- lastName
- password
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  password varchar(255) NOT NULL
);

```


#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL [Foreign key for users table],
  status VARCHAR(15) NOT NULL
);
```

```
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL [Foreign key to orders tabel],
  product_id INT NOT NULL [Foreign key to products tabel],
  quantity INT NOT NULL
);
```