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
    prefix = require('gulp-autoprefixer');

var jsSources = ['src/js/**/*.js'],
    cssSources = ['src/styles/**/*.css'],
    htmlSources = ['**/*.html'];

/*********************
 ******************** JavaScript gulp tasks
 ********************/
    //basic gulp function maker, first arg is command line name; ie gulp inject.
gulp.task('concatBowerJs', function(){
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        './bower_components/angular/angular.js'])
    .pipe(concat("libs.js"))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concatSrcJs', function(){
    gulp.src(['./src/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minJs', function(){
    gulp.src(['./dist/*.js'])
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
        path.extname = ".js";
        return path;
    }))
    .pipe(gulp.dest('./dist/'))
});

/*********************
********************* CSS gulp tasks
*********************/
gulp.task('concatBowerCSS', function(){
    gulp.src([
        './bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss'])
    .pipe(concat('libs.scss'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function(){
    gulp.src([
        './bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('concatSrcCSS', function(){
    gulp.src([
        './src/styles/*.css'])
    .pipe(concat('main.css'))
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
    var sources = gulp.src(['./dist/*.min.css', './dist/*.min.js'])
    gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('connect', function(){
    connect.server({
        root: './src',
        livereload: true,
        port: 8002
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

gulp.task('serve', ['concatBowerJs', 'concatSrcJs', 'minJs', 'concatBowerCSS', 'sass', 'concatSrcCSS', 'minCSS', 'inject', 'connect', 'watch']);