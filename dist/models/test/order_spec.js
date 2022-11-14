"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const store = new order_1.OrderStore();
describe("Order model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should return invalid because it needs to be authenticated", async () => {
        const result = await store.index();
        expect(result).toBeDefined();
    });
});
