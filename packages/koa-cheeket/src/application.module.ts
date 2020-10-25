import { Container } from "cheeket";
import AsyncModule from "./module-core/async-module";
import ApplierCoreModule from "./applyer/applier-core/applier-core.module";
import BodyParserModule from "./applyer/body-parser/body-parser.module";
import RouterModule from "./router/router.module";
import HandlerModule from "./handler/handler.module";
import DatabaseModule from "./database/database.module";

class ApplicationModule implements AsyncModule<undefined> {
  private readonly databaseModule = new DatabaseModule();

  private readonly handlerModule = new HandlerModule();

  private readonly applierCoreModule = new ApplierCoreModule();

  private readonly bodyParserModule = new BodyParserModule();

  private readonly routerModule = new RouterModule();

  async configured(container: Container): Promise<void> {
    await this.databaseModule.configured(container);
    await this.handlerModule.configured(container);
    await this.applierCoreModule.configured(container);
    await this.bodyParserModule.configured(container);
    await this.routerModule.configured(container);
  }

  async onPreStart(container: Container): Promise<void> {
    await this.applierCoreModule.onPreStart(container);
  }
}

export default ApplicationModule;
