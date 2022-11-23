import { Order,OrderStore } from "../order";
import ordersHandler from "../../handlers/orders";

const store = new OrderStore();

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
        expect(ordersHandler.show).toBeDefined();
    });
});