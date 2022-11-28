"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const products_1 = __importDefault(require("../../handlers/products"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
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
    let auth;
    beforeAll(() => {
        (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ firstName: "Test", lastName: "Account", password: "qwer1234" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then(response => {
            auth = response.body;
        });
    });
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
    it("index should respond with 200 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it("show should have a json response with status 200", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/products/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it("show should have an error code 404", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/products/489')
            .expect(404);
    });
    it("create should have a create method", () => {
        return (0, supertest_1.default)(server_1.default)
            .post('/products')
            .send({
            name: "Chips",
            price: 5
        })
            .set('authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it("addProduct should have an addProduct method", () => {
        return (0, supertest_1.default)(server_1.default)
            .post('/products/addProduct')
            .send({
            product_id: 2,
            quantity: 1
        })
            .set('authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
