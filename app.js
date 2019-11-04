// import Koa from "koa";
const Koa = require("koa");
const router = require("./router");

const app = new Koa();

app.context.host = process.env.host || "0.0.0.0";
app.context.port = process.env.port || 9527;

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
});
app.use(async ctx => {
	if (ctx.url === "/hello") {
		ctx.body = "Hello, World!";
	}
	console.log(ctx.path);
});

app.listen(9527, () => {
	console.log(`serve is running`);
});
