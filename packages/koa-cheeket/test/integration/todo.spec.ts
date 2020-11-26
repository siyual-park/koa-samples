import supertest from "supertest";
import createRequest from "../create-request";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /todos", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };

    const response = await request.post("/todos").send(todoPayload).expect(201);

    expect(response.body).not.toBeUndefined();
    expect(response.body.id).not.toBeUndefined();
    expect(response.body.title).toEqual(todoPayload.title);
    expect(response.body.description).toEqual(todoPayload.description);
    expect(response.body.created_at).not.toBeUndefined();
    expect(response.body.updated_at).not.toBeUndefined();
  });

  test("fail: invalid request", async () => {
    const todoPayload = {};
    await request.post("/todos").send(todoPayload).expect(400);
  });
});

describe("GET /todos", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };
    await request.post("/todos").send(todoPayload).expect(201);

    const response = await request.get("/todos").expect(200);

    expect(response.body).not.toBeUndefined();
    expect(response.body.length).toBeGreaterThan(0);

    const first = response.body[0];
    expect(first.id).not.toBeUndefined();
    expect(first.title).not.toBeUndefined();
    expect(first.description).not.toBeUndefined();
    expect(first.created_at).not.toBeUndefined();
    expect(first.updated_at).not.toBeUndefined();
  });
});

describe("DELETE /todos", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };
    const createResponse = await request
      .post("/todos")
      .send(todoPayload)
      .expect(201);

    await request.delete("/todos").expect(204);

    await request.get(`/todos/${createResponse.body.id}`).expect(404);
  });
});

describe("PATCH /todos/:id", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };
    const changed = { description: "test2" };

    const createResponse = await request
      .post("/todos")
      .send(todoPayload)
      .expect(201);
    const updateResponse = await request
      .patch(`/todos/${createResponse.body.id}`)
      .send(changed)
      .expect(200);

    expect(updateResponse.body).toStrictEqual({
      ...createResponse.body,
      ...changed,
    });
  });

  test("fail: cant find", async () => {
    await request.patch("/todos/1").expect(404);
  });
});

describe("GET /todos/:id", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };

    const createResponse = await request
      .post("/todos")
      .send(todoPayload)
      .expect(201);
    const findResponse = await request
      .get(`/todos/${createResponse.body.id}`)
      .expect(200);

    expect(createResponse.body).toStrictEqual(findResponse.body);
  });

  test("fail: cant find", async () => {
    await request.get("/todos/1").expect(404);
  });
});

describe("DELETE /todos/:id", () => {
  test("success", async () => {
    const todoPayload = { title: "test", description: "test" };

    const createResponse = await request
      .post("/todos")
      .send(todoPayload)
      .expect(201);
    await request.delete(`/todos/${createResponse.body.id}`).expect(204);

    await request.get(`/todos/${createResponse.body.id}`).expect(404);
  });

  test("fail: cant find", async () => {
    await request.delete("/todos/1").expect(404);
  });
});
