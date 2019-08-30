const gulp = require("gulp");
const del = require("del");
const autoprefixer = require('autoprefixer'); // add autoprefix css styles for older browsers support
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano"); // to minimixe css files code
const sass = require("gulp-sass"); // to add SASS support
const uglify = require('gulp-uglify'); // to minimize js files code
const concat = require('gulp-concat'); // to concat files

// add all the css/sass files here to compile
var css_files = [
	'./src/js/**/*.css', 
	'./src/css/**/*.css', 
	'./src/css/**/*.scss', 
]

// add all the js files here to compile
var js_files = [
	'./src/js/jquery-3.3.1.min.js',
	'./src/js/bootstrap/bootstrap.bundle.min.js',
	'./src/js/scripts.js',
]

// add all icon files here to compile
var icon_files = [
	'./src/css/fontawesome/webfonts/*',
]

// add all the compile files here to delete before recompiling
var cleanup_files = [
	'./dist/css/',
	'./dist/js/',
]

// CSS Task
function css() {
	return gulp.src(css_files)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(concat('styles.min.css'))
		.pipe(postcss([
			autoprefixer({
				cascade: false
			}), 
			cssnano()
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/assets/css/'));
}

// JS Task
function js() {
	return gulp.src(js_files, { sourcemaps: true })
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('dist/assets/js/', { sourcemaps: false }));
}

// Icons Task
function icons() {
	return gulp.src(icon_files, { sourcemaps: true })
        .pipe(gulp.dest('dist/assets/webfonts/'));
}

// Cleanup Task
function clean() {
	return del(cleanup_files);
}

// Watch files Task
function watchFiles() {
	// Watch sass/css files changes
	gulp.watch(css_files, css);
	
	// Watch js files changes
	gulp.watch(js_files, js);
}
const watch = gulp.series(clean, icons, watchFiles);


// Default Build Task
const build = gulp.series(clean, gulp.parallel(icons, css, js));
 
// Export all tasks
exports.css = css;
exports.js = js;
exports.icons = icons;
exports.clean = clean;
exports.watch = watch;
exports.default = build;
