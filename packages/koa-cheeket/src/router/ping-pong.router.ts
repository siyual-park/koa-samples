import Router, { RouterContext } from "koa-router";
import { ContainerContext } from "@cheeket/koa";

import pingPongMiddleware from "../middleware/ping-pong.middleware";

const router = new Router<never, ContainerContext & RouterContext>();
router.prefix("/ping");

router.post("/", pingPongMiddleware);

export default router;
