const Router = require("koa-router");
const { readdirSync } = require("fs");
const { join } = require("path");
const request = require("request-promise");
const router = new Router();

// 设置接口根path
router.prefix("/dw");

// router.all("*", ctx => {
// 	ctx.status = 404;
// 	ctx.body = {
// 		msg: "找不到资源",
// 		code: 404
// 	};
// });

// 注册路由
const files = readdirSync(join(__dirname, "module"));
const regxFile = /\.js$/i;
files.forEach(file => {
	if (!regxFile.test(file)) return;
	let params = file.replace(regxFile, "").split("_");
	let _method = params[0];
	let _route = params[1];
	const _module = require(join(__dirname, "module", file));
	router[_method]("/" + _route, async (ctx, next) => {
		let body = ctx.query;
		if (_method === "post") {
			body = ctx.request.body;
		}
		await request(_module(body))
			.then(d => {
				ctx.type = "application/json;charset=utf-8";
                ctx.status = 200;
                let data = typeof d === 'string' ? {data: d} : d
				ctx.body = Object.assign(data, {
					code: 0,
					msg: "okay"
				});
			})
			.catch(err => {
				ctx.status = 500;
				ctx.body = Object.assign(err, {
					code: 500,
					msg: "failed"
				});
			});
		// next();
	});
});

module.exports = router;
