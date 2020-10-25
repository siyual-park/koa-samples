import { Connection, Repository } from "typeorm";
import ValueProvider from "cheeket/dist/provider/value-provider";
import { EntityTarget } from "typeorm/common/EntityTarget";
import asSingleton from "cheeket/dist/provider/as-singleton";
import ContainerModule from "../../module-core/container.module";
import DatabaseCoreModule from "../database-core/database-core.module";
import * as TodoRepository from "./todo.repository";
import Todo from "../../entity/todo";

function repositoryProvider<T>(
  entity: EntityTarget<T>
): ValueProvider<Repository<T>> {
  return asSingleton(async (lookUp) => {
    const connection = await lookUp.resolveOrThrow(Connection);
    return connection.getRepository(entity);
  });
}

class RepositoryModule extends ContainerModule {
  static readonly Token = Symbol("RepositoryModule");

  constructor() {
    super(RepositoryModule.Token, [DatabaseCoreModule.Token]);
  }

  configuredInjection(): void {
    this.bind(TodoRepository.token).to(repositoryProvider(Todo));
  }
}

export default RepositoryModule;
