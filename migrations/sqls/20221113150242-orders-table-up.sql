CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  status SMALLINT NOT NULL
);
ALTER TABLE orders
    ADD CONSTRAINT kf_user_id_users FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE;
