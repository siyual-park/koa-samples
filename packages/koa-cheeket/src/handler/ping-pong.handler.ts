import Application from "koa";
import { injectable } from "@cheeket/injector";

@injectable()
class PingPongHandler {
  // eslint-disable-next-line class-methods-use-this
  post({ response }: Application.DefaultState): void {
    response.body = "pong";
    response.status = 200;
  }
}

export default PingPongHandler;
