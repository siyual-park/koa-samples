import bodyParser from "koa-bodyparser";
import Application from "koa";
import Applier from "../applier-core/applier";

class BodyParserApplier implements Applier {
  // eslint-disable-next-line class-methods-use-this
  apply(application: Application): void {
    application.use(bodyParser());
  }
}

export default BodyParserApplier;
