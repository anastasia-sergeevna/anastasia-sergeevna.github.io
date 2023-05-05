const gulp = require('gulp');
const {src, dest, watch, parallel} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
};

function browsersync() {
    
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function watching() {
    watch(['app/scss/style.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
};


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, browsersync, watching);
