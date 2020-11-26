import Router, { RouterContext } from "koa-router";
import { ContainerContext } from "@cheeket/koa";

import pingPongRouter from "./ping-pong.router";
import todoRouter from "./todo.router";

const router = new Router<never, ContainerContext & RouterContext>();

router.use(pingPongRouter.routes());
router.use(todoRouter.routes());

export default router;
