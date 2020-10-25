import Router from "koa-router";

function getRouter(pingPongRoute: Router, todoRoute: Router): Router {
  const router = new Router();

  router.use(pingPongRoute.routes());
  router.use(todoRoute.routes());

  return router;
}

const token = Symbol("root-router");
export default { getRouter, token };
