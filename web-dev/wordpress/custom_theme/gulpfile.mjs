// const fs = require('fs');
import gulp from 'gulp';
// import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import sassGlob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssimport from 'gulp-cssimport';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

// import newer from 'gulp-newer';

const bsInstance = browserSync.create();
const { dest, series, parallel } = gulp;

const sass = gulpSass(sassCompiler);
// Production flag
let isProduction = false;
let doCache = false;

// File paths
const paths = {
  scss: {
    general: {
      src: ['assets/scss/style.scss', 'assets/scss/general/**/*.scss'],
      dest: 'assets/css/styles/',
    },
    blocks: {
      src: [
        'assets/scss/blocks/**/*.scss',
        'assets/scss/blocks/*.scss',
        'assets/scss/blocks.scss',
      ],
      dest: 'assets/css/styles/blocks/',
    },
    pages: {
      src: ['assets/scss/pages/**/*.scss', 'assets/scss/pages/*.scss'],
      dest: 'assets/css/styles/pages/',
    },
    post: {
      src: ['assets/scss/post/**/*.scss', 'assets/scss/post/*.scss'],
      dest: 'assets/css/styles/post/',
    },
    lander: {
      src: ['assets/scss/landers.scss', 'assets/scss/landers/**/*.scss'],
      dest: 'assets/css/styles/',
    },
    other: {
      src: [
        'assets/scss/admin-topbar.scss',
        'assets/scss/admin.scss',
        'assets/scss/blogs.scss',
        'assets/scss/bootstrap.scss',
        'assets/scss/common/**/*.scss',
        'assets/scss/animations/**/*.scss',
        'assets/scss/case-studies.scss',
        'assets/scss/admin/**/*.scss',
        'assets/scss/blog/**/*.scss',
        'assets/scss/case-studies/**/*.scss',
      ],
      dest: 'assets/css/styles/',
    },
  },
  js: {
    stream: [
      'assets/js/dist/**/*.js',
      'assets/js/dist/*.js',
      'assets/chunks/**/*.js',
      'assets/js/post/*.js',
    ],
  },
};

const jsFiles = [
  {
    src: 'assets/js/ajax-plugin-reload.js',
    name: 'ajax-plugin-reload.',
  },
  {
    src: 'assets/js/scripts-jquery.js',
    name: 'scripts-jquery-',
  },
  // {
  //   src: 'assets/js/survey-forms.js',
  //   name: 'survey-forms.',
  // },
  // {
  //   src: 'assets/js/survey-submit-ajax.js',
  //   name: 'survey-submit-ajax.',
  // },
  // {
  //   src: 'assets/js/tf-numbers-ajax.js',
  //   name: 'tf-numbers-ajax.',
  // },
  {
    src: 'assets/js/src/admin.js',
    name: 'dist/admin.',
  },
];

const cssFiles = [
  {
    src: 'assets/css/hb-dev.css',
    name: 'hb-dev-',
  },
  {
    src: 'assets/css/header-new.css',
    name: 'header-new.',
  },
];

const postCssPlugins = [
  autoprefixer({
    remove: true,
    grid: false,
    flexbox: true,
    supports: true,
    overrideBrowserslist: ['> 0.5%, last 2 versions'],
  }),
  cssnano(),
  // ...(isProduction ? [cssnano()] : []),
];

const includePaths = [
  './node_modules/lightslider/src/css/',
  './node_modules/',
  './node_modules/bootstrap/',
  './assets/scss/',
];

const importOptions = {
  matchPattern: '*.css',
};

// Enable production mode
function enableProduction(cb) {
  isProduction = true;
  cb();
}

function enableRemember(cb) {
  doCache = true;
  cb();
}

function browserSyncReload(cb) {
  bsInstance.reload();
  cb();
}

function jsTask(done) {
  jsFiles.forEach((file) => {
    gulp
      .src(file.src)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({ basename: file.name, suffix: 'min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('./assets/js'))
      .pipe(gulpif(!isProduction, bsInstance.stream({ match: '**/*.css' })));
  });

  return done();
}

function cssTask(done) {
  cssFiles.forEach((file) => {
    gulp
      .src(file.src)
      .pipe(sourcemaps.init())
      .pipe(postcss(postCssPlugins))
      .pipe(rename({ basename: file.name, suffix: 'min' }))
      .pipe(sourcemaps.write('.'))

      .pipe(dest('./assets/css'))
      .pipe(gulpif(!isProduction, bsInstance.stream({ match: '**/*.css' })));
  });

  return done();
}

function scssTask($glob) {
  if (!isProduction) {
    bsInstance.notify(`<span class='bs-msg'>Compiling Sass</span>`, 10000);
  }
  const compiledStream = gulp
    .src($glob.src)
    .pipe(sourcemaps.init())
    // .pipe(gulpif(doCache, cache(cacheName)))
    .pipe(sassGlob())
    .pipe(cssimport(importOptions))
    .pipe(sass({ includePaths }).on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(sourcemaps.write('.'))
    // .pipe(gulpif(doCache, remember(cacheName)))
    .pipe(dest($glob.dest))
    .pipe(gulpif(!isProduction, bsInstance.stream({ match: '**/*.css' })));
  if (!isProduction) {
  }

  return compiledStream;
}
// Watch task: watch SCSS and JS files for changes
const scssGlob = paths.scss;
function watchTask() {
  bsInstance.init({
    proxy: 'https://customTheme.dev.lndo.site',
    https: {
      key: './../../../.ddev/traefik/certs/customTheme.key',
      cert: './../../../.ddev/traefik/certs/customTheme.crt',
    },
    logPrefix: 'CustomTheme',
    logConnections: true,
    logFileChanges: true,
    open: false,
    notify: true,
    reloadDebounce: 1500,
    ghostMode: false,
    notify: {
      styles: {
        width: '100vw',
        top: '0',
        margin: '0px',
        padding: '5px',
        position: 'fixed',
        'border-radius': '5px 0px 0px',
        'text-align': 'center',
        'background-color': 'rgba(255, 4, 65, 0.95)',
        'font-size': '1.5em',
        'font-weight': 'bold',
        'z-index': '1000000',
      },
    },
  });
  gulp.watch(paths.js.stream, browserSyncReload);
  gulp.watch(['**/*.php'], browserSyncReload);
  gulp.watch(['**/*.twig'], browserSyncReload);

  gulp.watch(scssGlob.general.src, compileGeneralSCSS);
  gulp.watch(scssGlob.blocks.src, compileBlocksSCSS);
  gulp.watch(scssGlob.pages.src, compilePagesSCSS);
  gulp.watch(scssGlob.post.src, compilePostSCSS);
  gulp.watch(scssGlob.lander.src, compileLanderSCSS);
  gulp.watch(scssGlob.other.src, compileOtherSCSS);

  jsFiles.forEach((file) => {
    gulp.watch(file.src, jsTask);
  });

  cssFiles.forEach((file) => {
    gulp.watch(file.src, cssTask);
  });
}

function compileGeneralSCSS() {
  return scssTask(scssGlob.general);
}
compileGeneralSCSS.displayName = 'General SCSS';

function compileBlocksSCSS() {
  return scssTask(scssGlob.blocks);
}

compileBlocksSCSS.displayName = 'Blocks SCSS';

function compilePagesSCSS() {
  return scssTask(scssGlob.pages);
}

compilePagesSCSS.displayName = 'Pages SCSS';

function compilePostSCSS() {
  return scssTask(scssGlob.post);
}

compilePostSCSS.displayName = 'Post SCSS';

function compileLanderSCSS() {
  return scssTask(scssGlob.lander);
}

compileLanderSCSS.displayName = 'Lander SCSS';

function compileOtherSCSS() {
  return scssTask(scssGlob.other);
}

compileOtherSCSS.displayName = 'Other SCSS';

export const watch = series(
  enableRemember,
  parallel(
    jsTask,
    cssTask,
    compileGeneralSCSS,
    compileBlocksSCSS,
    compilePagesSCSS,
    compilePostSCSS,
    compileLanderSCSS,
    compileOtherSCSS,
  ),
  watchTask,
);

export const production = series(
  enableProduction,
  parallel(
    jsTask,
    cssTask,
    compileGeneralSCSS,
    compileBlocksSCSS,
    compilePagesSCSS,
    compilePostSCSS,
    compileLanderSCSS,
    compileOtherSCSS,
  ),
);

export const prod = production;
