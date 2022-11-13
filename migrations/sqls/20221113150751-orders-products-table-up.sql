CREATE TABLE orders_products (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL
);
ALTER TABLE orders_products
    ADD CONSTRAINT kf_order_id_orders FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders_products
    ADD CONSTRAINT kf_product_id_products FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE;
