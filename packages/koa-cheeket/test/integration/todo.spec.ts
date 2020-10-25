import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /todo", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };

    const response = await request
      .post("/todo")
      .send({ title: "test", description: "test" })
      .expect(201);

    expect(response.body).not.toBeUndefined();
    expect(response.body.title).toEqual(todoPayload.title);
    expect(response.body.description).toEqual(todoPayload.description);
  });
});
