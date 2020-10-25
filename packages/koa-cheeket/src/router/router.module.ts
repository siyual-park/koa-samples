import { Container } from "cheeket";
import asSingleton from "cheeket/dist/provider/as-singleton";
import ApplicationApplier from "../applyer/applier-core/application.applier";
import rootRouter from "./root.router";
import pingPongRouter from "./ping-pong.router";
import todoRouter from "./todo.router";
import RouterApplier from "./router.applier";
import PingPongHandler from "../handler/ping-pong.handler";
import ApplierCoreModule from "../applyer/applier-core/applier-core.module";
import HandlerModule from "../handler/handler.module";
import ContainerModule from "../module-core/container.module";
import TodoHandler from "../handler/todo.handler";

class RouterModule extends ContainerModule {
  static readonly Token = Symbol("RouterModule");

  constructor() {
    super(RouterModule.Token, [HandlerModule.Token, ApplierCoreModule.Token]);
  }

  // eslint-disable-next-line class-methods-use-this
  async configured(container: Container): Promise<void> {
    await super.configured(container);

    const applicationApplier = await this.resolveOrThrow(ApplicationApplier);
    applicationApplier.register(await this.resolveOrThrow(RouterApplier));
  }

  configuredInjection(): void {
    this.bind(rootRouter.token)
      .to(
        asSingleton(async (lookUp) =>
          rootRouter.getRouter(
            await lookUp.resolveOrThrow(pingPongRouter.token),
            await lookUp.resolveOrThrow(todoRouter.token)
          )
        )
      )
      .inPrivate();

    this.bind(pingPongRouter.token)
      .to(
        asSingleton(async (lookUp) =>
          pingPongRouter.getRouter(await lookUp.resolveOrThrow(PingPongHandler))
        )
      )
      .inPrivate();

    this.bind(todoRouter.token)
      .to(
        asSingleton(async (lookUp) =>
          todoRouter.getRouter(await lookUp.resolveOrThrow(TodoHandler))
        )
      )
      .inPrivate();

    this.bind(RouterApplier).to(
      asSingleton(
        async (lookUp) =>
          new RouterApplier(await lookUp.resolveOrThrow(rootRouter.token))
      )
    );
  }
}

export default RouterModule;
