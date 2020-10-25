import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /ping", () => {
  test("success", async () => {
    const response = await request.post("/ping").expect(200);
    expect(response.text).toEqual("pong");
  });
});
