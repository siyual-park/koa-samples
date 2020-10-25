import asSingleton from "cheeket/dist/provider/as-singleton";
import { autoInjected } from "@cheeket/injector";
import PingPongHandler from "./ping-pong.handler";
import ContainerModule from "../module-core/container.module";
import TodoHandler from "./todo.handler";
import RepositoryModule from "../database/repository/repository.module";

class HandlerModule extends ContainerModule {
  static readonly Token = Symbol("HandlerModule");

  constructor() {
    super(HandlerModule.Token, [RepositoryModule.Token]);
  }

  configuredInjection(): void {
    this.bind(PingPongHandler, asSingleton(autoInjected(PingPongHandler)));
    this.bind(TodoHandler, asSingleton(autoInjected(TodoHandler)));
  }
}

export default HandlerModule;
