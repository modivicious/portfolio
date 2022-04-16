import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import cleanCss from "gulp-clean-css";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import webpConvert from "gulp-webp";
import cheerio from "gulp-cheerio";
import svgSprite from "gulp-svg-sprite";
import zip from "gulp-zip";
import del from "del";
import browserSync from "browser-sync";

browserSync.create();
const sass = gulpSass(dartSass);

export const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

export const styles = () => {
  return gulp.src("app/scss/style.scss")
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["defaults, not IE 11"]
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
}

export const scripts = () => {
  return gulp.src([
    "node_modules/fullpage.js/dist/fullpage.js",
    "node_modules/parallax-js/dist/parallax.js",
    "node_modules/gsap/dist/gsap.js",
    "app/js/main.js"
  ])
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.stream());
}

export const htmlMin = () => {
  return gulp.src("app/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
}

export const cssMin = () => {
  return gulp.src("app/css/**/*.css")
    .pipe(cleanCss({ level: 2 }))
    .pipe(gulp.dest("dist/css"));
}

export const jsMin = () => {
  return gulp.src("app/js/main.min.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
}

export const imagesMin = () => {
  return gulp.src("app/images/**/*.*")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 82, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            { name: 'removeViewBox', active: true },
            { name: 'cleanupIDs', active: false },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
}

export const webp = () => {
  return gulp.src(["app/images/**/*.{jpg,jpeg,png}", "!app/images/favicon/*"], { since: gulp.lastRun(webp) })
    .pipe(webpConvert({ quality: 82 }))
    .pipe(gulp.dest("app/images"));
}

export const webpDel = () => {
  return del("app/images/**/*.webp");
}

export const sprite = () => {
  return gulp.src("app/images/sprite/*.svg")
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[xmlns]').removeAttr('xmlns');
      },
      parserOptions: {
        xmlMode: true
      },
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest("app/images"));
}

export const buildFonts = () => {
  return gulp.src("app/fonts/*").pipe(gulp.dest("dist/fonts"));
}

export const buildOther = () => {
  return gulp.src(["app/**/manifest.json"]).pipe(gulp.dest("dist"));
}

export const cleanDist = () => {
  return del("dist");
}

export const zipArchive = () => {
  return gulp.src("dist/**/*")
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest("dist"));
}

export const watching = () => {
  gulp.watch(["app/scss/**/*.scss"], styles);
  gulp.watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  gulp.watch("app/images/**/*.{jpg,jpeg,png}").on("add", webp);
  gulp.watch(["app/**/*.html"]).on("change", browserSync.reload);
}

export const build = gulp.series(cleanDist, gulp.parallel(htmlMin, cssMin, jsMin, buildFonts, buildOther, imagesMin), zipArchive);

export default gulp.parallel(styles, scripts, browsersync, watching);
