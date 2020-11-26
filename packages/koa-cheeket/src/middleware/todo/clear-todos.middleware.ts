import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import Token from "../../service/token";

const clearTodosMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  await service.deleteAll();

  context.status = 204;

  await next();
};

export default clearTodosMiddleware;
