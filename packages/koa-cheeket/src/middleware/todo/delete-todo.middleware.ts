import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import Token from "../../service/token";

const deleteTodoMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext & RouterContext
> = async (context, next) => {
  const service = await context.resolve(Token.TodoService);
  await service.deleteById(context.params.id);

  context.status = 204;

  await next();
};

export default deleteTodoMiddleware;
