const Router = require("koa-router");
const Koax = require("koa2-request-middleware");
const router = new Router();
const koax = new Koax();

koax.mount(async () => {
	return koax
		.setName("daily")
		.cached()
		.request({
			uri: "https://interface.meiriyiwen.com/article/today?dev=1",
			method: "GET"
		});
});

// 设置接口根path
router.prefix("/dw");
router
	.get("/", (ctx, next) => {
		ctx.body = "fuck, world";
	})
	.get("/daily", koax.middleware(), (ctx, next) => {
        // ctx.body = "daily article";
        ctx.type = "application/json;charset=utf-8"
        ctx.body = ctx.koax.daily;
		ctx.status = 200;
        console.log(JSON.parse(ctx.koax.daily).author);
	})
	.all("/test", (ctx, next) => {
		console.log(ctx.request.query);
		ctx.body = JSON.stringify(ctx.request.body);
	});

module.exports = router;
