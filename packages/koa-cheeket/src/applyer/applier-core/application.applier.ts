import Application from "koa";
import { injectable } from "@cheeket/injector";
import Applier from "./applier";

@injectable()
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
