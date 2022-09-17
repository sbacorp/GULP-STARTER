const {src,dest} = require("gulp");

// config
const path = require("../config/path.js");
const app = require("../config/app.js");


//плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssImport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const mediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");
const { isDev } = require("../config/app.js");


const css = () => {
	return src(path.css.src,{sourcemaps: app.isDev})
	.pipe(plumber({
		errorHandler: notify.onError(error => ({
			title:"css",
		message: error.message
		}))
	}))
	.pipe(concat("style.css"))
	.pipe(cssImport())
	.pipe(webpCss())
	.pipe(autoprefixer())
	.pipe(mediaQueries())
	.pipe(shorthand())
	.pipe(size({title:"main.css"}))
	.pipe(dest(path.css.dest,{sourcemaps: app.isDev}))
	.pipe(rename({suffix:".min"}))
	.pipe(csso())
	.pipe(size({title:"main.min.css"}))
	.pipe(dest(path.css.dest,{sourcemaps: app.isDev}));
}

module.exports = css;
