"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const products_1 = __importDefault(require("../../handlers/products"));
const store = new product_1.ProductStore();
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
        expect(products_1.default.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(products_1.default.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(products_1.default.create).toBeDefined();
    });
    it("should have an addProduct method", () => {
        expect(products_1.default.addProduct).toBeDefined();
    });
});
