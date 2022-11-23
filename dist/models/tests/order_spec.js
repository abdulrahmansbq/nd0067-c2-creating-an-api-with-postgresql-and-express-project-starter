"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const orders_1 = __importDefault(require("../../handlers/orders"));
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
});
