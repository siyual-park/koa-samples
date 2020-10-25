import Router from "koa-router";
import Application from "koa";
import Applier from "../applyer/applier-core/applier";

class RouterApplier implements Applier {
  constructor(private readonly router: Router) {}

  apply(application: Application): void {
    application.use(this.router.routes());
    application.use(this.router.allowedMethods());
  }
}

export default RouterApplier;
