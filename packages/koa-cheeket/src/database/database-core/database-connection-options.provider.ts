import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import path from "path";
import uniqid from "uniqid";

class DatabaseConnectionOptionsProvider {
  // eslint-disable-next-line class-methods-use-this
  get(): ConnectionOptions {
    return {
      type: "sqlite",
      database: `:memory/${uniqid()}.sqlite`,
      synchronize: true,
      logging: "all",
      entities: [path.join(__dirname, "../../entity/**/*.{ts,js}")],
    };
  }
}

export default DatabaseConnectionOptionsProvider;
