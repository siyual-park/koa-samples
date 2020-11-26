import Application from "koa";

const log: Application.Middleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export default log;
