const gulp = require("gulp");
const clean = require('gulp-clean');
const postcss = require("gulp-postcss"); // library required for cssnano and autoprefixes
const autoprefixer = require('autoprefixer'); // add autoprefix CSS styles for older browsers support
const cssnano = require("cssnano"); // to minimixe CSS files code
const sourcemaps = require('gulp-sourcemaps'); // to generate sourcemap files for SASS
const sass = require("gulp-sass"); // to add SASS support
const uglify = require('gulp-uglify'); // to minimize JS files code
const concat = require('gulp-concat'); // to concat JS files

var theme_folder="../wp-content/themes/boilerplate-theme/"

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
	'./src/js/slick/slick.min.js',
	'./src/js/scripts.js',
]

// add all font files here to compile
var font_files = [
	'./src/css/fontawesome/webfonts/*',
	'./src/fonts/*',
]


// add all the compile files here to delete before recompiling
var cleanup_files = [
	'../html/dist/css/',
	'../html/dist/js/',
]
var cleanup_files_wp = [
	theme_folder + 'dist/css/',
	theme_folder + 'dist/js/',
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
		.pipe(gulp.dest('../html/dist/css/'));
}
function css_wp() {
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
		.pipe(gulp.dest(theme_folder + 'dist/css/'));
}


// JS Task
function js() {
	return gulp.src(js_files, { sourcemaps: true })
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('../html/dist/js/', { sourcemaps: false }));
}
function js_wp() {
	return gulp.src(js_files, { sourcemaps: true })
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(theme_folder + 'dist/js/', { sourcemaps: false }));
}


// Fonts Task
function fonts() {
	return gulp.src(font_files)
		.pipe(gulp.dest('../html/dist/webfonts/'));
}
function fonts_wp() {
	return gulp.src(font_files)
		.pipe(gulp.dest(theme_folder + 'dist/webfonts/'));
}


// Cleanup Task
function clean_files() {
	return gulp.src(
		cleanup_files,
		{
			read: false,
			allowEmpty: true
		}
	)
	.pipe(clean({force: true})); 
}
function clean_files_wp() {
	return gulp.src(
		cleanup_files_wp,
		{
			read: false,
			allowEmpty: true
		}
	)
	.pipe(clean({force: true})); 
}


// Watch files Task
function watchFiles() {
	// Watch sass/css files changes
	gulp.watch(css_files, css);
	
	// Watch js files changes
	gulp.watch(js_files, js);
	
	// Watch fonts files changes
	gulp.watch(font_files, fonts);
}
function watchFiles_wp() {
	// Watch sass/css files changes
	gulp.watch(css_files, css_wp);
	
	// Watch js files changes
	gulp.watch(js_files, js_wp);
	
	// Watch fonts files changes
	gulp.watch(font_files, fonts_wp);
}

// Watch Task
const watch = gulp.parallel(watchFiles);
const watchwp = gulp.parallel(watchFiles_wp);

// Build Task
const build = gulp.series(clean_files, gulp.parallel(fonts, css, js));
const buildwp = gulp.series(clean_files_wp, gulp.parallel(fonts_wp, css_wp, js_wp));


// Export all tasks
exports.css = css;
exports.csswp = css_wp;
exports.js = js;
exports.jswp = js_wp;
exports.fonts = fonts;
exports.fontswp = fonts_wp;

exports.clean = clean_files;
exports.cleanwp = clean_files_wp;
exports.watch = watch;
exports.watchwp = watchwp;
exports.build = build;
exports.buildwp = buildwp;
exports.default = build;
