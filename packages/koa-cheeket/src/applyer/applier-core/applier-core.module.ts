import asSingleton from "cheeket/dist/provider/as-singleton";
import Application from "koa";
import Container from "cheeket";
import { autoInjected } from "@cheeket/injector";
import ApplicationApplier from "./application.applier";
import ContainerModule from "../../module-core/container.module";

class ApplierCoreModule extends ContainerModule {
  static readonly Token = Symbol("ApplierCoreModule");

  constructor() {
    super(ApplierCoreModule.Token);
  }

  configuredInjection(): void {
    this.bind(
      ApplicationApplier,
      asSingleton(autoInjected(ApplicationApplier))
    );
  }

  async onPreStart(container: Container): Promise<void> {
    const application: Application = await container.resolve(Application);
    const applicationApplier: ApplicationApplier = await this.resolve(
      ApplicationApplier
    );

    applicationApplier.apply(application);
  }
}

export default ApplierCoreModule;
