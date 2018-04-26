let gulp = require("gulp"),
	sass = require("gulp-sass"),
	uglifyJS = require("gulp-uglify"),
	babel = require("gulp-babel"),
	htmlmin = require("gulp-htmlmin"),
	connect = require("gulp-connect"),
	dest = "dist"; // 项目部署目标目录


// gulp 其他的引用省去
var cached = require('gulp-cached');
var print = require('gulp-print');

gulp.task('esx-component', function() {
	gulp.src(esxSrc)
	    .pipe(cached('esx-component'))
	    .pipe(print())
	    .pipe(babel({
		    presets: ['react', 'es2015'],
		    plugins: [
			    "transform-es2015-block-scoping",
			    "transform-class-properties",
			    "transform-es2015-computed-properties",
			    "transform-es2015-modules-amd"
		    ]
	    }))
	    .pipe(gulp.dest('./public/js/component'));
});

// 启动服务器
gulp.task('connect', function() {
	connect.server({
		root : dest,
		livereload : true
	});
});

// 定制任务：编译sass
gulp.task("sass", function(){
	gulp.src("./src/sass/*.scss")
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest("./"+ dest +"/css"))
		.pipe(connect.reload());
});

// 定制任务：压缩JS
gulp.task("js", function(){
	gulp.src("./src/js/*.js")
		.pipe(babel({
            presets: ['env']
        }))
        .pipe(uglifyJS())
		.pipe(gulp.dest("./"+ dest +"/js"))
		.pipe(connect.reload());
});

// 定制任务，压缩HTML
gulp.task("html", function(){
	gulp.src("./src/**/*.html")
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
		.pipe(gulp.dest("./"+ dest +""))
		.pipe(connect.reload());
});

// 复制 images、lib、mock .php文件夹下所有资源
gulp.task("copy-img", function(){
	gulp.src("./src/img/**/*.*")
		.pipe(gulp.dest("./"+ dest +"/img"))
		.pipe(connect.reload());
});
gulp.task("copy-lib", function(){
	gulp.src("./src/lib/**/*.*")
		.pipe(gulp.dest("./"+ dest +"/lib"))
		.pipe(connect.reload());
});
gulp.task("copy-mock", function(){
	gulp.src("./src/mock/**/*.*")
		.pipe(gulp.dest("./"+ dest +"/mock"))
		.pipe(connect.reload());
});
gulp.task("copy-css", function(){
	gulp.src("./src/css/**/*.*")
		.pipe(gulp.dest("./"+ dest +"/css"))
		.pipe(connect.reload());
});
gulp.task("copy-php", function(){
	gulp.src("./src/php/**/*.*")
		.pipe(gulp.dest("./"+ dest +"/php"))
		.pipe(connect.reload());
});
gulp.task("copy", ["copy-img", "copy-lib", "copy-mock", "copy-css", "copy-php"]);

// 监视任务, 修改之后进行更新
gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/js/*.js'], ['js']);
	gulp.watch(['./src/sass/*.scss'], ['sass']);
});

// 定制默认任务
gulp.task('default', ["sass", "js", "html", "copy", 'connect', 'watch']);