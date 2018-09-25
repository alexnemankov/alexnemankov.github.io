require('es6-promise').polyfill();

var gulp = require('gulp');
var cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulpIf = require('gulp-if'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

var path = {};

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano({
            autoprefixer: {
                cascade: false,
                browsers: ['> 1%', 'last 5 versions'],
                add: true
            }
        })))
        .pipe(gulpIf('*.html', htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:js', function() {
    return gulp.src('app/scripts/**.js')
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('copy:backend', function() {
    return gulp.src('app/backend/**/*')
        .pipe(gulp.dest('dist/backend'));
});

gulp.task('copy:lightbox', function () {
    return gulp.src('app/images/*.+(png|gif)')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:images', ['copy:lightbox'], function() {
    return gulp.src('app/images/+(png|jpg|svg)/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('build:sass', function() {
    gulp.src('app/styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('build', function() {
    runSequence('clean:dist', 'build:sass', ['useref', 'copy:fonts', 'copy:images', 'copy:js', 'copy:backend'], function() {
        gutil.log(gutil.colors.green('✔ ') + 'Build has been completed');
    });
});

gulp.task('watch', ['build:sass'], function () {
    gulp.watch('app/**/*.scss', ['build:sass']);
});

gulp.task('default', ['build'], function() {});
