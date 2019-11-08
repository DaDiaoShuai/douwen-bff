const gulp = require("gulp");
const uglify = require("gulp-uglify");
const { pipeline } = require("readable-stream");
const babel = require("gulp-babel");

gulp.task("default", function() {
	return pipeline(
		gulp.src(["src/*.js", "src/**/*.js"]),
		babel({
			presets: ["@babel/env"],
			plugins: ["@babel/transform-runtime"]
		}),
		uglify(),
		gulp.dest("dist")
	);
});
