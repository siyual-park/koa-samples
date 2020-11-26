import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import Token from "../../service/token";

const findTodoMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext & RouterContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  const todo = await service.findById(context.params.id);

  context.status = 200;
  context.body = todo;

  await next();
};

export default findTodoMiddleware;
