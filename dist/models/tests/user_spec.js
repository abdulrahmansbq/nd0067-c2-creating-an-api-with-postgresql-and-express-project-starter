"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const users_1 = __importDefault(require("../../handlers/users"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new user_1.UserStore();
describe("User model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("index should return empty array", async () => {
        const result = await store.index();
        expect(result).toHaveSize(1);
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
    it("create should return id", async () => {
        const result = await store.create({
            firstName: "Abdulrahman",
            lastName: "Alsubaiq",
            password: "QWER1234"
        });
        expect(result).toEqual(2);
    });
    it("index should return array of length equals 2", async () => {
        const result = await store.index();
        expect(result.length).toEqual(2);
    });
    it("show should return the data of a specific user", async () => {
        const result = await store.show("1");
        expect(result.id).toEqual(1);
    });
});
describe("Users handler", () => {
    let auth;
    beforeAll(() => {
        (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ firstName: "Test", lastName: "Account2", password: "qwer1234" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then(response => {
            auth = response.body;
        });
    });
    it("should have an index method", () => {
        expect(users_1.default.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(users_1.default.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(users_1.default.create).toBeDefined();
    });
    it("index should respond with 401 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401);
    });
    it("index should respond with 200 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/users')
            .set('Accept', 'application/json')
            .set('authorization', auth)
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it("show should respond with 404 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/users/485')
            .set('Accept', 'application/json')
            .set('authorization', auth)
            .expect('Content-Type', /json/)
            .expect(404);
    });
    it("show should respond with 200 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .get('/users/1')
            .set('Accept', 'application/json')
            .set('authorization', auth)
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it("create should respond with 500 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ lastName: "Account_with_no_firstname", password: 'qwer1234' })
            .set('authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500);
    });
    it("create should respond with 200 code", () => {
        return (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ firstName: "Test", lastName: "Account_with_firstname", passsword: "qwer1234" })
            .set('authorization', auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
