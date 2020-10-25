import asSingleton from "cheeket/dist/provider/as-singleton";
import PingPongHandler from "./ping-pong.handler";
import ContainerModule from "../module-core/container.module";
import TodoHandler from "./todo.handler";
import RepositoryModule from "../database/repository/repository.module";
import * as TodoRepository from "../database/repository/todo.repository";

class HandlerModule extends ContainerModule {
  static readonly Token = Symbol("HandlerModule");

  constructor() {
    super(HandlerModule.Token, [RepositoryModule.Token]);
  }

  configuredInjection(): void {
    this.bind(PingPongHandler).to(asSingleton(() => new PingPongHandler()));

    this.bind(TodoHandler).to(
      asSingleton(
        async (lookUp) =>
          new TodoHandler(await lookUp.resolveOrThrow(TodoRepository.token))
      )
    );
  }
}

export default HandlerModule;
