// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()

const sass = require("gulp-sass")(require("sass"));
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat-files");
const uglify = require("gulp-uglify");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const remember = require("gulp-remember");
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");


// File paths
const files = {
  scssPath: "scss/**/*.scss",
  scssEntry: "scss/*.scss",
  jsPath: "js/src/**/*.js",
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssEntry)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sassGlob()) // glob sass files
    .pipe(sass().on("error", sass.logError)) // compile SCSS to CSS
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          remove: true,
        }),
        cssnano(),
      ])
    ) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(remember("sass"))
    .pipe(dest("css")); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath,
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(dest("js"));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true }, //Makes docker work
    series(parallel(scssTask, jsTask))
  );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(parallel(scssTask, jsTask), watchTask);

exports.watch = series(parallel(scssTask, jsTask), watchTask);
