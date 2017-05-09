const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');

//CSS FUNCTION
gulp.task('css', function() {
    return gulp.src('./css/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(size())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(size())
        .pipe(gulp.dest('./js/dist'))
        .pipe(browserSync.stream());
});


gulp.task('img', function() {
    return gulp.src('./images/original/*')
        .pipe(changed('./images/'))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(size())
        .pipe(gulp.dest('./images/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./css/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./images/*', ['img']);
});

//serve browser
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'js', 'img', 'watch', 'serve']);