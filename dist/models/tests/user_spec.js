"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const users_1 = __importDefault(require("../../handlers/users"));
const store = new user_1.UserStore();
describe("User model", () => {
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
    it("create should return id", async () => {
        const result = await store.create({
            firstName: "Abdulrahman",
            lastName: "Alsubaiq",
            password: "QWER1234"
        });
        expect(result).toEqual(1);
    });
    it("index should return empty array", async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
    });
    it("index should return empty array", async () => {
        const result = await store.show("1");
        expect(result.id).toEqual(1);
    });
});
describe("Users handler", () => {
    it("should have an index method", () => {
        expect(users_1.default.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(users_1.default.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(users_1.default.create).toBeDefined();
    });
});
