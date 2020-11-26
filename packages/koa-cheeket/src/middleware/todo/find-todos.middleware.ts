import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import Token from "../../service/token";

const findTodosMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  const todos = await service.findAll();

  context.status = 200;
  context.body = todos;

  await next();
};

export default findTodosMiddleware;
