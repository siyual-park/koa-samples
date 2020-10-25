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
    this.bind(
      DatabaseConnectionOptionsProvider,
      asSingleton(() => new DatabaseConnectionOptionsProvider())
    );

    this.bind(
      DatabaseConnectionProvider,
      asSingleton(
        async (lookUp) =>
          new DatabaseConnectionProvider(
            (await lookUp.resolve(DatabaseConnectionOptionsProvider)).get()
          )
      )
    );

    this.bind(
      Connection,
      asSingleton(async (lookUp) =>
        (await lookUp.resolve(DatabaseConnectionProvider)).get()
      )
    );
  }
}

export default DatabaseCoreModule;
