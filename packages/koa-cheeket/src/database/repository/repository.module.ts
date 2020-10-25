import { Connection, Repository } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { asSingleton, Provider } from "cheeket";
import ContainerModule from "../../module-core/container.module";
import DatabaseCoreModule from "../database-core/database-core.module";
import * as TodoRepository from "./todo.repository";
import Todo from "../../entity/todo";

function repositoryProvider<T>(
  entity: EntityTarget<T>
): Provider<Repository<T>> {
  return asSingleton(async (lookUp) => {
    const connection = await lookUp.resolve(Connection);
    return connection.getRepository(entity);
  });
}

class RepositoryModule extends ContainerModule {
  static readonly Token = Symbol("RepositoryModule");

  constructor() {
    super(RepositoryModule.Token, [DatabaseCoreModule.Token]);
  }

  configuredInjection(): void {
    this.bind(TodoRepository.token, repositoryProvider(Todo));
  }
}

export default RepositoryModule;
