import asSingleton from "cheeket/dist/provider/as-singleton";
import Application from "koa";
import Container from "cheeket";
import ApplicationApplier from "./application.applier";
import ContainerModule from "../../module-core/container.module";

class ApplierCoreModule extends ContainerModule {
  static readonly Token = Symbol("ApplierCoreModule");

  constructor() {
    super(ApplierCoreModule.Token);
  }

  configuredInjection(): void {
    this.bind(ApplicationApplier).to(
      asSingleton(() => new ApplicationApplier())
    );
  }

  async onPreStart(container: Container): Promise<void> {
    const application = await container.resolveOrThrow(Application);
    const applicationApplier = await this.resolveOrThrow(ApplicationApplier);

    applicationApplier.apply(application);
  }
}

export default ApplierCoreModule;
