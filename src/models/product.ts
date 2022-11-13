import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
};
export type ProductWithoutId = {
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find products ${id}. Error: ${err}`);
    }
  }

  async create(p: ProductWithoutId): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    userId: string,
    productId: string
  ): Promise<boolean> {
    // get order to see if it is open
    let orderId;
    try {
      const ordersql =
        "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
      const conn = await client.connect();

      const result = await conn.query(ordersql, [userId]);

      const order = result.rows;

      if (order.length == 0) {
        const createOrderSQL =
          "INSERT INTO orders (user_id, status) VALUES ($1, 'active') RETURNING *";

        const result = await conn.query(createOrderSQL, [userId]);

        orderId = result.rows[0].id;
      } else {
        orderId = order[0].id;
      }

      conn.release();
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
