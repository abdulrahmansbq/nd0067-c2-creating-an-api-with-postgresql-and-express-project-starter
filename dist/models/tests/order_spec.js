"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const supertest_1 = __importDefault(require("supertest"));
const orders_1 = __importDefault(require("../../handlers/orders"));
const server_1 = __importDefault(require("../../server"));
const store = new order_1.OrderStore();
describe("Order model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should return empty array because there are no user id 5", async () => {
        const result = await store.show("5");
        expect(result).toEqual([]);
    });
});
describe("Orders handler", () => {
    it("should have a show method", () => {
        expect(orders_1.default.show).toBeDefined();
    });
    it("should respond with 401 unauthorized code code.", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/order')
            .set('Accept', 'application/json')
            .expect(401);
    });
});
