"use strict";var Koa=require("koa"),router=require("./router"),koaBody=require("koa-body"),Boom=require("@hapi/boom"),app=new Koa;app.context.port=process.env.port||9527,app.use(koaBody()),app.use(router.routes()).use(router.allowedMethods({throw:!0,notImplemented:function(){return new Boom.notImplemented},methodNotAllowed:function(){return new Boom.methodNotAllowed}})),app.listen(9527,function(){console.log("serve is running")});