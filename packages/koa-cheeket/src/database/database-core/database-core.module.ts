import { Connection } from "typeorm";
import asSingleton from "cheeket/dist/provider/as-singleton";
import ContainerModule from "../../module-core/container.module";
import DatabaseConnectionProvider from "./database-connection.provider";
import DatabaseConnectionOptionsProvider from "./database-connection-options.provider";

class DatabaseCoreModule extends ContainerModule {
  static readonly Token = Symbol("DatabaseCoreModule");

  constructor() {
    super(DatabaseCoreModule.Token);
  }

  configuredInjection(): void {
    this.bind(DatabaseConnectionOptionsProvider).to(
      asSingleton(() => new DatabaseConnectionOptionsProvider())
    );

    this.bind(DatabaseConnectionProvider).to(
      asSingleton(
        async (lookUp) =>
          new DatabaseConnectionProvider(
            (
              await lookUp.resolveOrThrow(DatabaseConnectionOptionsProvider)
            ).get()
          )
      )
    );

    this.bind(Connection).to(
      asSingleton(async (lookUp) =>
        (await lookUp.resolveOrThrow(DatabaseConnectionProvider)).get()
      )
    );
  }
}

export default DatabaseCoreModule;
