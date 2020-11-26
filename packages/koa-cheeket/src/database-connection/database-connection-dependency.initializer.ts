import { Initializer } from "@cheeket/koa";
import { inContainerScope, interfaces } from "cheeket";
import Token from "./token";

import connectionOptionsProvider from "./connection-options.provider";
import connectionProvider from "./connection.provider";

class DatabaseConnectionDependencyInitializer implements Initializer {
  private readonly connectionOptionsProvider = inContainerScope(
    connectionOptionsProvider
  );

  private readonly connectionProvider = inContainerScope(connectionProvider);

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.ConnectionOptions, this.connectionOptionsProvider);
    container.bind(Token.Connection, this.connectionProvider);
  }

  // eslint-disable-next-line class-methods-use-this
  initContextContainer(_: interfaces.Container): void {}
}

export default DatabaseConnectionDependencyInitializer;
