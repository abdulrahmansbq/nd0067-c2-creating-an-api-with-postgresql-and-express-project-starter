import express, { Request, Response } from "express";
import { ProductStore, ProductWithoutId } from "../models/product";
import jwt, { JwtPayload } from "jsonwebtoken";

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    jwt.verify(
      <string>req.headers.authorization,
      <string>process.env.TOKEN_SECRET
    );
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const product: ProductWithoutId = {
    name: req.body.name,
    price: <number>req.body.price,
  };
  const products = await store.create(product);
  res.json(products);
};

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const products = await store.show(<string>req.params.id);
  res.json(products);
};

const addProduct = async (req: Request, res: Response) => {
  let payload;
  try {
    payload = jwt.verify(
      <string>req.headers.authorization,
      <string>process.env.TOKEN_SECRET
    ) as unknown as JwtPayload;
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const products = await store.addProduct(
    <number>parseInt(req.body.quantity),
    <string>payload.user,
    <string>req.body.product_id
  );
  res.json(products);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products/:id", show);
  app.post("/products/addProduct", addProduct);
};

export default product_routes;
