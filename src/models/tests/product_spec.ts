import { Product, ProductStore } from "../product";
import productsHandler from "../../handlers/products"
import supertest from "supertest";
import app from "../../server";
import {response} from "express";
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
    let auth: string;
    beforeAll(() => {
        supertest(app)
            .post('/users')
            .send({firstName: "Test", lastName: "Account", password: "qwer1234"})
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then(response => {
                auth = response.body;
            })
    })
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

    it("index should respond with 200 code", () => {
        return supertest(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it("show should have a json response with status 200", () => {
        return supertest(app)
            .get('/products/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it("show should have an error code 404", () => {
        return supertest(app)
            .get('/products/489')
            .expect(404);
    });

    it("create should have a create method", () => {
        return supertest(app)
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
        return supertest(app)
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