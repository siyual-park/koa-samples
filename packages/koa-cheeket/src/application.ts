import KoaApplication from "koa";
import { Server } from "net";
import { Container } from "cheeket";
import AsyncModule from "./module-core/async-module";

class Application extends KoaApplication {
  private readonly modules = new Set<AsyncModule<unknown>>();

  constructor(private readonly rootContainer = new Container()) {
    super();
    this.rootContainer.bind(KoaApplication, () => this);
  }

  async start(port?: number): Promise<Server> {
    await Promise.all(
      Array.from(this.modules.values()).map((module) =>
        module.onPreStart?.(this.rootContainer)
      )
    );

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = this.listen(port, (err) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  install<T>(
    module: AsyncModule<T>,
    configure: (configuration: T) => void | Promise<void> = () => {}
  ): Promise<void> {
    this.modules.add(module);
    return module.configured(this.rootContainer, configure);
  }
}

export default Application;
