import { Server } from "net";
import dependency from "@cheeket/koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import {
  snakeCase,
  camelCase,
  requestBody,
  responseBody,
} from "koa-change-case";

import root from "./router/root.router";
import DependencyInitializer from "./dependency.initializer";

import log from "./core/log/log.middleware";
import serializeMiddleware from "./core/parser/serialize.middleware";
import validate from "./core/validate/validate.middleware";

async function bootstrap(port?: number): Promise<Server> {
  const application = new Application();

  application.use(log);
  application.use(bodyParser());
  application.use(camelCase(requestBody));

  application.use(
    dependency(new DependencyInitializer(), { maxListeners: 1000 })
  );

  application.use(root.routes());
  application.use(root.allowedMethods());

  application.use(serializeMiddleware(responseBody));
  application.use(validate(responseBody));
  application.use(snakeCase(responseBody));

  return application.listen(port);
}

export default bootstrap;
