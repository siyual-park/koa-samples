import Application, { DefaultState, ParameterizedContext } from "koa";
import { Exchanger } from "koa-change-case";
import { ContainerContext } from "@cheeket/koa";

function mapping<T, U>(
  exchanger: Exchanger,
  mapper: (
    value: T,
    context: ParameterizedContext<DefaultState, ContainerContext>
  ) => U | Promise<U>
): Application.Middleware<DefaultState, ContainerContext> {
  return async (context, next) => {
    const value = await exchanger.extract(context);
    await exchanger.inject(context, await mapper(value as T, context));
    await next();
  };
}

export default mapping;
