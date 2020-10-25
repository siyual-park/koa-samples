import Router from "koa-router";
import TodoHandler from "../handler/todo.handler";

function getRouter(handler: TodoHandler): Router {
  const router = new Router();

  router.prefix("/todo");
  router.post("/", (ctx, next) => handler.post(ctx, next));

  return router;
}

const token = Symbol("todo-router");
export default { getRouter, token };
