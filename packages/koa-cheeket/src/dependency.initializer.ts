import { Initializer } from "@cheeket/koa";
import { interfaces } from "cheeket";
import DatabaseConnectionDependencyInitializer from "./database-connection/database-connection-dependency.initializer";
import RepositoryDependencyInitializer from "./repository/repository-dependency.initializer";
import ServiceDependencyInitializer from "./service/service-dependency.initializer";

class DependencyInitializer implements Initializer {
  private readonly databaseConnectionDependencyInitializer = new DatabaseConnectionDependencyInitializer();

  private readonly repositoryDependencyInitializer = new RepositoryDependencyInitializer();

  private readonly serviceDependencyInitializer = new ServiceDependencyInitializer();

  initRootContainer(container: interfaces.Container): void {
    this.databaseConnectionDependencyInitializer.initRootContainer(container);
    this.repositoryDependencyInitializer.initRootContainer(container);
    this.serviceDependencyInitializer.initRootContainer(container);
  }

  initContextContainer(container: interfaces.Container): void {
    this.databaseConnectionDependencyInitializer.initContextContainer(
      container
    );
    this.repositoryDependencyInitializer.initContextContainer(container);
    this.serviceDependencyInitializer.initContextContainer(container);
  }
}

export default DependencyInitializer;
