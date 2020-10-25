import "reflect-metadata";
import { Server } from "net";
import Application from "./application";
import ApplicationModule from "./application.module";

async function bootstrap(port?: number): Promise<Server> {
  const app = new Application();
  await app.install(new ApplicationModule());
  return app.start(port);
}

export default bootstrap;
