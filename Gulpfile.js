const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()
const nunjucksGulp = require('gulp-nunjucks')
const nunjucks = require('nunjucks')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const cssimport = require('postcss-import')
const webpack = require('webpack-stream')
const named = require('vinyl-named')
const del = require('del')
const shell = require('gulp-shell')

/****** SERVER TASKS ******/

gulp.task('default', ['server'])

/**
 * SERVER: Master server task
 */
gulp.task('server', ['build', 'watch'], function() {
  /**
   * SERVER: Start a simple server
   * at http://localhost:7000 that
   * looks at /dist
   */
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 7000
  })
})

/**
 * SERVER: Watch for changes in
 * files and execute the respective
 * build task.
 */
gulp.task('watch', () => {
  gulp.watch('./src/**/*.css', ['css'])
  gulp.watch('./src/**/*.js', ['js'])
  gulp.watch('./src/**/*.html', ['html:watch'])
  gulp.watch('./src/assets/**/*', ['assets'])
})

function errorHandler(err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    message: err.toString()
  })(err)
}

/****** BUILD TASKS ******/

/**
 * BUILD: Master build all task
 */
gulp.task('build', ['css', 'js', 'html', 'assets'])

/**
 * BUILD: Copy assets over
 */
gulp.task('assets', () => {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./dist/assets'))
})

/**
 * BUILD: Build the views
 *
 * Inject the JSON data
 */

gulp.task('html', () => {
  return gulp
    .src(['./src/pages/home/index.html', './src/pages/**/index.html'])
    .pipe(plumber({ errorHandler }))
    .pipe(
      nunjucksGulp.compile(
        require('./src/data'), // insert data here
        {
          // specify include path "./src"
          env: nunjucks.configure('./src')
        }
      )
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('html:watch', () => {
  return gulp
    .src(['./src/pages/home/index.html', './src/pages/**/index.html'])
    .pipe(plumber({ errorHandler }))
    .pipe(
      nunjucksGulp.compile(
        require('./src/data'), // insert data here
        {
          // specify include path "./src"
          env: nunjucks.configure('./src', {
            // watch html files
            watch: true
          })
        }
      )
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

/**
 * BUILD: Build the styles
 *
 * - Adds vendor prefixes
 * - Compiles cssnext syntax
 * http://cssnext.io/features/
 */
gulp.task('css', () => {
  return gulp
    .src('./src/pages/**/index.css')
    .pipe(plumber({ errorHandler }))
    .pipe(
      postcss([
        cssimport({ path: './src' }),
        cssnext({
          browsers: 'last 2 versions'
        })
      ])
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

/**
 * BUILD: Build the js
 *
 * Compiles ES2015 syntax
 * https://babeljs.io/learn-es2015/
 */
gulp.task('js', () => {
  return gulp
    .src('./src/pages/index.js')
    .pipe(plumber({ errorHandler }))
    .pipe(
      webpack({
        entry: {
          index: './src/pages/index.js',
          'home/index': './src/pages/home/index.js',
          'projects/index': './src/pages/projects/index.js',
          'about/index': './src/pages/about/index.js'
        },
        output: {
          filename: '[name].js'
        },
        devtool: 'source-map',
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['env']
              }
            }
          ]
        }
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

/**
 * Empty out ./dist
 */
gulp.task('clean', () => {
  return del(['./dist/**', '!./dist'])
})
