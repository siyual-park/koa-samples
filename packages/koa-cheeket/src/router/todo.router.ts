import Router, { RouterContext } from "koa-router";
import { ContainerContext } from "@cheeket/koa";
import { requestBody, responseBody } from "koa-change-case";

import validate from "../core/validate/validate.middleware";
import deserializeMiddleware from "../core/parser/deserialize.middleware";
import mapping from "../core/mapper/mapping.middlware";

import CreateTodoRequest from "../payload/todo/create-todo.request";
import UpdateTodoRequest from "../payload/todo/update-todo.request";

import todoToView from "../mapper/todo-to-view";
import mapWith from "../core/util/map-with";

import createTodoMiddleware from "../middleware/todo/create-todo.middleware";
import findTodosMiddleware from "../middleware/todo/find-todos.middleware";
import clearTodosMiddleware from "../middleware/todo/clear-todos.middleware";
import findTodoMiddleware from "../middleware/todo/find-todo.middleware";
import updateTodoMiddleware from "../middleware/todo/update-todo.middleware";
import deleteTodoMiddleware from "../middleware/todo/delete-todo.middleware";

const router = new Router<never, ContainerContext & RouterContext>();
router.prefix("/todos");

router.post(
  "/",
  deserializeMiddleware(requestBody, CreateTodoRequest),
  validate(requestBody),
  createTodoMiddleware,
  mapping(responseBody, todoToView)
);

router.get(
  "/",
  findTodosMiddleware,
  mapping(responseBody, mapWith(todoToView))
);

router.delete("/", clearTodosMiddleware);

router.get("/:id", findTodoMiddleware, mapping(responseBody, todoToView));

router.patch(
  "/:id",
  deserializeMiddleware(requestBody, UpdateTodoRequest),
  validate(requestBody),
  updateTodoMiddleware,
  mapping(responseBody, todoToView)
);

router.delete("/:id", deleteTodoMiddleware);

export default router;
