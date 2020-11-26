import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import Token from "../../service/token";

const updateTodoMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext & RouterContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  const todo = await service.updateById(
    context.params.id,
    context.request.body
  );

  context.status = 200;
  context.body = todo;

  await next();
};

export default updateTodoMiddleware;
