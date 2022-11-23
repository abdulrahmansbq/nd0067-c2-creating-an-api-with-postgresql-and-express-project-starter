import express, { Request, Response } from "express";
import { User, UserStore, UserWithoutId } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
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
  try{
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json("Something went wrong while fetching the users");
    return;
  }
};

const show = async (req: Request, res: Response) => {
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

  try{
    const users = await store.show(<string>req.params.id);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json("Something went wrong while fetching the users");
    return;
  }
};

const create = async (req: Request, res: Response) => {
  const user: UserWithoutId = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, <string>process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ error: "something went wrong" });
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users/:id", show);
};

export default user_routes;
