import Application from "koa";
import { Exchanger } from "koa-change-case";

import isSerializable from "./is-serializable";
import serialize from "./serialize";

function serializeMiddleware(exchanger: Exchanger): Application.Middleware {
  return async (context, next) => {
    const value = await exchanger.extract(context);
    if (isSerializable(value)) {
      await exchanger.inject(context, await value.toJSON());
    } else if (value instanceof Array) {
      await exchanger.inject(context, await Promise.all(value.map(serialize)));
    }

    await next();
  };
}

export default serializeMiddleware;
