// import Koa from "koa";
const Koa = require("koa");
const router = require("./router");
const koaBody = require("koa-body");
const Boom = require("@hapi/boom");

const app = new Koa();

app.context.host = process.env.host || "0.0.0.0";
app.context.port = process.env.port || 9527;

app.use(koaBody());


app.use(router.routes()).use(
	router.allowedMethods({
		throw: true,
		notImplemented: () => new Boom.notImplemented(),
		methodNotAllowed: () => new Boom.methodNotAllowed()
	})
);

app.listen(9527, () => {
	console.log(`serve is running`);
});
