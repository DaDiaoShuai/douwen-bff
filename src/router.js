const Router = require("koa-router");
const { readdirSync } = require("fs");
const { join } = require("path");
const request = require("request-promise");
const router = new Router();
const { success, exception } = require('./config/response');

// 设置接口根path
router.prefix("/dw");

// 注册路由
const files = readdirSync(join(__dirname, "module"));
const regxFile = /\.js$/i;
files.forEach(file => {
	if (!regxFile.test(file)) return;
	let params = file.replace(regxFile, "").split("_");
	let _method = params[0];
	let _route = params[1];
	let isCustom = params[2] === 'custom';
		// 来自http请求的数据
	const _module = require(join(__dirname, "module", file));
	router[_method]("/" + _route, async (ctx, next) => {
		let body = _method === "post" ? ctx.request.body : ctx.query;
		if(!isCustom) {
			await request(_module(body))
				.then(d => {
					ctx.type = "application/json;charset=utf-8";
					ctx.status = 200;
					let data = typeof d === 'string' ? {result: d} : (d.data || d);
					ctx.body = Object.assign({data}, success);
				})
				.catch(err => {
					ctx.status = 500;
					ctx.body = Object.assign(err, exception);
				});
		} else {
			_module(body)
				.then(d => {
					ctx.status = 200;
					ctx.body = Object.assign({
						data: d
					}, success)
				})
				.catch(err => {
					ctx.status = 500;
					ctx.body = Object.assign(err, exception);
				});
		}
			// next();
	})
});

module.exports = router;
