// gulpfile.js — Barebone (Node 22+ async-safe)
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const fs = require('fs-extra');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

// Paths
const paths = {
  pug: {
    src: 'src/pug/**/*.pug',
    // srcEntry: ['src/pug/**/*.pug', '!src/pug/parts/**'],
    srcEntry: ['src/pug/pages/**/*.pug'],
    dest: 'dist/',
  },
  styles: {
    src: 'src/sass/**/*.{sass,scss}',
    entry: 'src/sass/style.sass',
    dest: 'dist/assets/css/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/assets/js/',
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images/',
  },
  fonts: {
    src: 'src/assets/fonts/**/*',
    dest: 'dist/assets/fonts/',
  },
  dist: 'dist/',
};

// Clean dist
async function cleanDist() {
  await fs.remove(paths.dist);
}

// Compile Pug -> HTML
function compilePug() {
  return src(paths.pug.srcEntry)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

// Compile Sass (.sass/.scss) -> CSS
function compileSass() {
  return src(paths.styles.entry)
    .pipe(plumber())
    .pipe(
      sass({
        indentedSyntax: true,
        includePaths: ['src/sass'],
      }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'style' }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Copy JS
function processJS() {
  return src(paths.scripts.src)
    .pipe(plumber())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy fonts
function copyFonts() {
  return src(paths.fonts.src)
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Optimize images (dynamic import for async-safe)
async function optimizeImages() {
  const imagemin = (await import('gulp-imagemin')).default;
  return src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Serve & Watch
function serve() {
  browserSync.init({
    server: { baseDir: paths.dist },
    open: false,
    notify: false,
  });

  watch(paths.pug.src, compilePug);
  watch(paths.styles.src, compileSass);
  watch(paths.scripts.src, processJS);
  watch(paths.images.src, optimizeImages);
  watch(paths.fonts.src, copyFonts);
}

// Build
const build = series(
  cleanDist,
  parallel(compilePug, compileSass, processJS, optimizeImages, copyFonts)
);

exports.default = series(build, serve);
exports.build = build;
exports.clean = cleanDist;
