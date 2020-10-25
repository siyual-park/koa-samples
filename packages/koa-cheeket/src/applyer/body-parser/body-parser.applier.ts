import bodyParser from "koa-bodyparser";
import Application from "koa";
import { injectable } from "@cheeket/injector";
import Applier from "../applier-core/applier";

@injectable()
class BodyParserApplier implements Applier {
  // eslint-disable-next-line class-methods-use-this
  apply(application: Application): void {
    application.use(bodyParser());
  }
}

export default BodyParserApplier;
