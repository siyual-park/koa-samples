import { Connection, createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

class DatabaseConnectionProvider {
  constructor(private readonly options?: ConnectionOptions) {}

  async get(): Promise<Connection> {
    if (this.options === undefined) {
      return createConnection();
    }
    return createConnection(this.options);
  }
}

export default DatabaseConnectionProvider;
