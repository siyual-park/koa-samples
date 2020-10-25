import { Container } from "cheeket";
import asSingleton from "cheeket/dist/provider/as-singleton";
import BodyParserApplier from "./body-parser.applier";
import ApplicationApplier from "../applier-core/application.applier";
import ApplierCoreModule from "../applier-core/applier-core.module";
import ContainerModule from "../../module-core/container.module";

class BodyParserModule extends ContainerModule {
  static readonly Token = Symbol("BodyParserModule");

  constructor() {
    super(BodyParserModule.Token, [ApplierCoreModule.Token]);
  }

  async configured(container: Container): Promise<void> {
    await super.configured(container);

    const applicationApplier = await this.resolveOrThrow(ApplicationApplier);

    applicationApplier.register(await this.resolveOrThrow(BodyParserApplier));
  }

  configuredInjection(): void {
    this.bind(BodyParserApplier).to(asSingleton(() => new BodyParserApplier()));
  }
}

export default BodyParserModule;
