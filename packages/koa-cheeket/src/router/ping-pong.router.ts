import Router from "koa-router";
import PingPongHandler from "../handler/ping-pong.handler";

function getRouter(pingPoneHandler: PingPongHandler): Router {
  const router = new Router();

  router.post("/ping", pingPoneHandler.post);

  return router;
}

const token = Symbol("ping-pong-router");
export default { getRouter, token };
