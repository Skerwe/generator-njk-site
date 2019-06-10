const { src, dest, watch, series, parallel } = require("gulp");
const data = require("gulp-data");
const rimraf = require("gulp-rimraf");
const nunjucksRender = require("gulp-nunjucks-render");
const autoprefixer = require("gulp-autoprefixer");
const sassdoc = require("sassdoc");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const sass = require("gulp-sass");

sass.compiler = require("node-sass");

const config = {
  input: "app/",
  output: "dist/",
  scripts: {
    input: "app/scripts/*.js",
    output: "dist/js"
  },
  styles: {
    main: "app/scss/main.scss",
    input: "app/scss/*.scss",
    output: "dist/css",
    docs: "dist/sassdoc"
  },
  nunjucks: {
    pages: "app/pages/**/*.+(html|njk)",
    templates: "app/templates/**/*.+(html|njk)"
  },
  images: {
    input: "app/images/**/*",
    output: "dist/img"
  },
  static: {
    css: "app/css/*.css",
    other: "app/static/*"
  }
};

const sassOptions = {
  outputStyle: "expanded"
};
const sassdocOptions = {
  dest: config.styles.docs
};

function sassTask() {
  return src(config.styles.main)
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(config.styles.output))
    .pipe(browserSync.stream());
}

function sassDocTask() {
  return src(config.styles.input).pipe(sassdoc(sassdocOptions)).resume();
}

function scriptTask() {
  return src(
    ["app/scripts/plugins.js", "app/scripts/main.js"]
  ).pipe(concat({
    path: "main.js"
  }))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe(dest(config.scripts.output));
}

function nunjucksTask() {
  return src(config.nunjucks.pages)
    .pipe(data(function () {
      return require('./app/data.json')
    }))
    .pipe(nunjucksRender({
      path: ["app/templates"]
    })).pipe(
      dest(config.output)
    );
}

function imagesMinTask() {
  return src(config.images.input)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(dest(config.images.output));
}

function cleanTask() {
  return src(config.output, {
    read: false,
    allowEmpty: true
  }).pipe(rimraf());
}

function copyStaticTask() {
  return src(config.static.other).pipe(dest(config.output));
}

function copyCssTask() {
  return src(config.static.css).pipe(dest(config.styles.output));
}

function watchTask() {
  watch(config.styles.input, sassTask);
  watch([config.scripts.input], scriptTask).on('change', browserSync.reload);
  watch([config.nunjucks.pages, config.nunjucks.templates], nunjucksTask).on('change', browserSync.reload);
}

function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: config.output
    }
  });
}

exports.clean = cleanTask;
exports.sass = sassTask;
exports.sassdoc = sassDocTask;
exports.nunjucks = nunjucksTask;
exports.scripts = scriptTask;
exports.imagesmin = imagesMinTask;
exports.copystatic = series(copyStaticTask, copyCssTask);
exports.build = series(nunjucksTask, sassTask, copyStaticTask, copyCssTask, scriptTask, imagesMinTask);
exports.default = series(cleanTask, nunjucksTask, sassTask, sassDocTask, copyStaticTask, copyCssTask, scriptTask, imagesMinTask);
exports.serve = parallel(browserSyncTask, watchTask);
