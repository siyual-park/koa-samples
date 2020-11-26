import Application, { DefaultState } from "koa";
import { ContainerContext } from "@cheeket/koa";

const pingPongMiddleware: Application.Middleware<
  DefaultState,
  ContainerContext
> = async (context, next) => {
  context.body = "pong";
  context.status = 200;

  await next();
};

export default pingPongMiddleware;
