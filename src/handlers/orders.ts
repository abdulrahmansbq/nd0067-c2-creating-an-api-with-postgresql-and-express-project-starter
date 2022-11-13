import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import jwt, { JwtPayload } from "jsonwebtoken";

const store = new OrderStore();

const show = async (_req: Request, res: Response) => {
  let payload;
  try {
    payload = jwt.verify(
      <string>_req.headers.authorization,
      <string>process.env.TOKEN_SECRET
    ) as unknown as JwtPayload;
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.show(<string>payload.user);
  res.json(orders);
};

const order_routes = (app: express.Application) => {
  app.get("/order", show);
};

export default order_routes;
