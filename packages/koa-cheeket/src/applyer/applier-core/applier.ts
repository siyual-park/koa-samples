import Application from "koa";

interface Applier {
  apply(application: Application): void;
}

export default Applier;
