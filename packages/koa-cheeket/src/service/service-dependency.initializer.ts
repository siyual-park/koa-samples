import { Initializer } from "@cheeket/koa";
import { inContainerScope, interfaces } from "cheeket";
import { autoInjected } from "@cheeket/injector";
import Token from "./token";
import TodoService from "./todo.service";

class ServiceDependencyInitializer implements Initializer {
  private readonly todoServiceProvider = inContainerScope(
    autoInjected(TodoService)
  );

  initRootContainer(container: interfaces.Container): void {
    container.bind(Token.TodoService, this.todoServiceProvider);
  }

  // eslint-disable-next-line class-methods-use-this
  initContextContainer(_: interfaces.Container): void {}
}

export default ServiceDependencyInitializer;
