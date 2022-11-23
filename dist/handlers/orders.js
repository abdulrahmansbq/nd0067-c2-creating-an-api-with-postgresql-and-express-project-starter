"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new order_1.OrderStore();
const show = async (_req, res) => {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    try {
        const orders = await store.show(payload.user);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while fetching the order");
        return;
    }
};
const order_routes = (app) => {
    app.get("/order", show);
};
exports.default = order_routes;
