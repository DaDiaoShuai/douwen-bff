const Router = require("koa-router");

const router = new Router();

router.get("/", (ctx, next) => {
	ctx.body = "fuck, world";
	// next();
});

module.exports = router;
