"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = "localhost:3000";
const corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
products_1.default.product_routes(app);
users_1.default.user_routes(app);
orders_1.default.order_routes(app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
