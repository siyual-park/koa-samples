import Application from "koa";
import { Exchanger } from "koa-change-case";

import isValidatable from "./is-validatable";

function validate(exchanger: Exchanger): Application.Middleware {
  return async (context, next) => {
    const value = await exchanger.extract(context);
    if (isValidatable(value)) await value.validate();
    await next();
  };
}

export default validate;
