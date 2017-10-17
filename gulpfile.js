const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

gulp.task('brows', function () {
    return browserify({entries: 'src/scripts/app.js', extensions: ['.js'], debug: true})
        .transform(babelify.configure({
            presets: ['es2015']
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function(){
    gulp.src('src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 3 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('css'))
        .pipe(gulp.dest('public'))
});

gulp.task('htmlbuild', function(){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('webserver', function() {
    gulp.src('public')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('start', ['sass', 'htmlbuild', 'webserver', 'brows']);