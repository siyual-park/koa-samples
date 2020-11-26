import Application from "koa";
import { Exchanger } from "koa-change-case";
import Deserializable from "./deserializable";

function deserializeMiddleware<T>(
  exchanger: Exchanger,
  deserializable: Deserializable<T>
): Application.Middleware {
  return async (context, next) => {
    const value = await exchanger.extract(context);
    await exchanger.inject(context, deserializable.from(value));
    await next();
  };
}

export default deserializeMiddleware;
