"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while fetching the users");
        return;
    }
};
const show = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    try {
        const users = await store.show(req.params.id);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while fetching the users");
        return;
    }
};
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json({ error: "something went wrong" });
    }
};
const user_routes = (app) => {
    app.get("/users", index);
    app.post("/users", create);
    app.get("/users/:id", show);
};
exports.default = {
    user_routes,
    create,
    show,
    index
};
