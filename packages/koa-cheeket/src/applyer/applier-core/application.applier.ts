import Application from "koa";
import Applier from "./applier";

class ApplicationApplier implements Applier {
  private readonly appliers = new Set<Applier>();

  apply(application: Application): void {
    this.appliers.forEach((applier: Applier) => applier.apply(application));
  }

  register(applier: Applier): void {
    this.appliers.add(applier);
  }
}

export default ApplicationApplier;
