const {src,dest} = require("gulp");

// config
const path = require("../config/path.js");
const app = require("../config/app.js");


//плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");

//обработка фото
const img = () => {
	return src(path.img.src)
	.pipe(plumber({
		errorHandler: notify.onError(error => ({
			title:"img",
		message: error.message
		}))
	}))
	.pipe(newer(path.img.dest))
	.pipe(webp())
	.pipe(src(path.img.src))
	.pipe(dest(path.img.dest))
	.pipe(newer(path.img.dest))
	.pipe(gulpif(app.isProd,imagemin(app.imagemin)))
	.pipe(dest(path.img.dest));
}

module.exports = img;
