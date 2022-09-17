const {src,dest} = require("gulp");

// config
const path = require("../config/path.js");
const app = require("../config/app.js");

//плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size")
const webpHtml = require("gulp-webp-html")

const html = () => {
	return src(path.html.src)
	.pipe(plumber({
		errorHandler: notify.onError(error => ({
			title:"HTML",
		message: error.message
		}))
	}))
	.pipe(fileinclude())
	.pipe(webpHtml())
	.pipe(size({title:"до сжатия"}))
	.pipe(htmlmin(app.htmlmin))
	.pipe(size({title:"после сжатия"}))
	.pipe(dest(path.html.dest))
	
	webpHtml
}

module.exports = html;
