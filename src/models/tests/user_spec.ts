import { UserStore } from "../user";
import usersHandler from "../../handlers/users";

const store = new UserStore();

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
        expect(usersHandler.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(usersHandler.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(usersHandler.create).toBeDefined();
    });
});