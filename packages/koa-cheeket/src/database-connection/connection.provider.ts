import { interfaces } from "cheeket";
import { Connection, createConnection } from "typeorm";

import Token from "./token";

const connectionProvider: interfaces.Provider<Connection> = async (context) => {
  const connectionOptions = await context.resolve(Token.ConnectionOptions);
  return createConnection(connectionOptions);
};

export default connectionProvider;
