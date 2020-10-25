import { Container } from "cheeket";
import AsyncModule from "../module-core/async-module";
import DatabaseCoreModule from "./database-core/database-core.module";
import RepositoryModule from "./repository/repository.module";

class DatabaseModule implements AsyncModule<undefined> {
  private readonly databaseModule = new DatabaseCoreModule();

  private readonly repositoryModule = new RepositoryModule();

  async configured(container: Container): Promise<void> {
    await this.databaseModule.configured(container);
    await this.repositoryModule.configured(container);
  }
}

export default DatabaseModule;
