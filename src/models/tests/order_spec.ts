import { Order,OrderStore } from "../order";

const store = new OrderStore();

describe("Order model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("should return empty array because there are no user id 5", async () => {
        const result = await store.show("5");
        expect(result).toEqual([]);
    });
})