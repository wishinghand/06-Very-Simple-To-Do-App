var gulp = require('gulp'),
    gutil = require('gulp-util'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    prefix = require('gulp-autoprefixer');

var jsSources = ['src/temp/**/*.js'],
    // jsSources = ['src/js/**/*.js'],
    cssSources = ['src/styles/**/*.css'],
    htmlSources = ['**/*.html'];

//use wiredep for bower concats
//blow out dist folder
//use 2nd array argument in tasks that need synchronous operation

/**********************************************************************************************
JS gulp tasks
*/
    //basic gulp function maker, first arg is command line name; ie gulp inject.
gulp.task('concatBowerJs', function(){
    // gulp.src([
    //     './bower_components/jquery/dist/jquery.js',
    //     './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    //     './bower_components/angular/angular.js'])
    gulp.src('bower_components/**/*.min.js')
    .pipe(wiredep())
    .pipe(concat("libs.js"))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concatCustomJs', function(){
    gulp.src(['./src/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minJs', function(){
    if (!gulp.src('./dist/main.min.js')) {
        gulp.src(['./dist/main.js'])
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
            return path;
        }))
        .pipe(gulp.dest('./dist/'))
    }
});

/**********************************************************************************************
CSS gulp tasks
*/

gulp.task('compileBowerSass', function(){
     gulp.src('src/styles/style.scss')
    .pipe(sass({
        loadPath: ['src/styles/style.scss']
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('compileCustomSass', function(){
    gulp.src(['./src/styles/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('concatBowerCSS', function(){
    gulp.src('bower_components/**/*.scss')
    .pipe(sass())
    .pipe(wiredep())
    .pipe(concat('libs.scss'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('concatCustomCSS', function(){
    gulp.src(['./src/styles/*.scss'])
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('prefixCSS', function(){
    gulp.src(['./dist/*.css'])
    .pipe(prefix())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minCSS', function(){
    gulp.src(['./dist/*.css'])
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
        path.extname = ".css";
        return path;
    }))
    .pipe(gulp.dest('./dist/'))
});


gulp.task('inject', function(){
    var sources = gulp.src(['./dist/*.css', './dist/*.js'])
    gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('connect', function(){
    connect.server({
        root: './src',
        livereload: true,
        port: 8001
    })
});

//checks js/html/css on change...
gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch(cssSources, ['css']);
    gulp.watch(htmlSources, ['html']);
});

//...and reloads
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(connect.reload())
});

gulp.task('serve', ['concatBowerJs', 'concatCustomJs', 'concatBowerCSS', 'sass', 'concatCustomCSS','prefixCSS', 'minCSS',  'inject', 'connect', 'watch']);

gulp.task('dev', ['connect', 'watch']);