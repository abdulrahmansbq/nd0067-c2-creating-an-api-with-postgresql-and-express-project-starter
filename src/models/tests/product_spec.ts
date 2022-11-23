import { Product, ProductStore } from "../product";
import productsHandler from "../../handlers/products"
const store = new ProductStore();

describe("Product model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("index should return empty array", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("show should return undefined", async () => {
        const result = await store.show('4');
        expect(result).toBeUndefined();
    });

    it("should have a create method", () => {
        expect(store.show).toBeDefined();
    });

    it("create should return empty array", async () => {
        const result = await store.create({
            name: "Bottle of water",
            price: 1
        });
        expect(result).toEqual({
            id: 1,
            name: "Bottle of water",
            price: 1
        });
    });

    it("index should return empty array", async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: "Bottle of water",
            price: 1
        }]);
    });

    it("index should return empty array", async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: "Bottle of water",
            price: 1
        });
    });

});

describe("Product handler", () => {
    it("should have an index method", () => {
        expect(productsHandler.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(productsHandler.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(productsHandler.create).toBeDefined();
    });

    it("should have an addProduct method", () => {
        expect(productsHandler.addProduct).toBeDefined();
    });
});