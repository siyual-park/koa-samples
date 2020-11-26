import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import Token from "../../service/token";

const createTodoMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  const todo = await service.create(context.request.body);

  context.status = 201;
  context.body = todo;

  await next();
};

export default createTodoMiddleware;
