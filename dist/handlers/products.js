"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new product_1.ProductStore();
const create = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const products = await store.create(product);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while storing the product");
        return;
    }
};
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while fetching the products");
        return;
    }
};
const show = async (req, res) => {
    try {
        const products = await store.show(req.params.id);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while fetching the product");
        return;
    }
};
const addProduct = async (req, res) => {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    try {
        const products = await store.addProduct(parseInt(req.body.quantity), payload.user, req.body.product_id);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json("Something went wrong while adding the product");
        return;
    }
};
const product_routes = (app) => {
    app.get("/products", index);
    app.post("/products", create);
    app.get("/products/:id", show);
    app.post("/products/addProduct", addProduct);
};
exports.default = {
    product_routes,
    addProduct,
    show,
    index,
    create
};
