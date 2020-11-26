import { interfaces } from "cheeket";
import { Connection, Repository } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

function createRepositoryProvider<T extends ObjectLiteral>(
  connectionToken: interfaces.Token<Connection>,
  type: interfaces.Type<T>
): interfaces.Provider<Repository<T>> {
  return async (context) => {
    const connection = await context.resolve(connectionToken);
    return connection.getRepository(type);
  };
}

export default createRepositoryProvider;
