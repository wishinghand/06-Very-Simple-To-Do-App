var gulp = require('gulp'),
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    // uncss = require('gulp-uncss'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

var jsSources = ['src/**/*.js'],
    cssSources = ['src/style/**/*.scss', 'src/style/**/*.css'],
    htmlSources = ['**/*.html'];

gulp.task('clean', function(){
    return gulp.src('./build/*.*', {read: false})
    .pipe(clean());
});

/**JS gulp tasks*****************************************************************/
gulp.task('concatJs', function(){
    return gulp.src(['node_modules/lodash/lodash.js', 'node_modules/angular/angular.js', 'node_modules/angular-toastr/dist/angular-toastr.js', 'node_modules/angular-toastr/dist/angular-toastr.tpls.js', './src/**/*.module.js', './src/**/*.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build/'))
});

/**CSS gulp tasks*****************************************************************/
gulp.task('compileSass', function(){
    return gulp.src(['node_modules/angular-toastr/dist/angular-toastr.css', 'node_modules/animate.css/animate.css', 'node_modules/bulma/bulma.sass', './src/css/*.scss', './src/css/*.css'])
    .pipe(sass())
    //and concatenates them
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./build/'));
});

// gulp.task('copyFonts', function() {
//     return gulp.src(['node_modules/font-awesome/fonts/*'])
//             .pipe(gulp.dest('./fonts'));
// });

gulp.task('inject', function(){
    var sources = gulp.src(['./build/*.css', './build/*.js'], {read: false})
    // var sources = gulp.src(['./build/*.css', './src/core/lodash.min.js', './node_modules/angular/angular.js', './node_modules/checklist-model/checklist-model.js', './src/core/angular-simple-logger.js', './src/core/angular-google-maps.js', './src/core/app.module.js', './src/secrets/keys.value.js', './src/core/*.js', './src/search/addressInput.controller.js'], {read: false})
    return gulp.src('index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function(){
    return connect.server({
        root: './',
        livereload: true,
        port: 8889
    })
});

//checks js/html/css on change...
gulp.task('watch', function() {
    gulp.watch(jsSources, ['concatJs', 'js']);
    gulp.watch(cssSources, ['compileSass', 'css']);
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

// gulp.task('uncss', function() {
//     gulp.src('./build.css')
//         .pipe(uncss({
//             html: ['index.html', './src/about.html']
//         }))
//         .pipe(gulp.dest('./build'));
// });

gulp.task('serve', function(done) {
    runSequence('clean', 'concatJs', 'compileSass', 'inject', 'connect', 'watch', function() {
        done();
    });
});