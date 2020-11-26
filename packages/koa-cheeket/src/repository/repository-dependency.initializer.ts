import { Initializer } from "@cheeket/koa";
import { inContainerScope, interfaces } from "cheeket";
import todoRepositoryProvider from "./todo-repository.provider";
import Token from "./token";

class RepositoryDependencyInitializer implements Initializer {
  private readonly todoRepositoryProvider = inContainerScope(
    todoRepositoryProvider
  );

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.TodoRepository, this.todoRepositoryProvider);
  }

  // eslint-disable-next-line class-methods-use-this
  initContextContainer(_: interfaces.Container): void {}
}

export default RepositoryDependencyInitializer;
