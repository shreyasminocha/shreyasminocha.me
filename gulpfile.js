const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const resize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

gulp.task('html', () => {
    // TODO
});

gulp.task('css', () => {
    return gulp.src('static/css/**.css')
        .pipe(stylelint({
            reporters: [
                { formatter: 'string', console: true }
            ]
        }));
});

gulp.task('js', () => {
    return gulp.src('static/js/**.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('md', () => {
    // TODO
});

gulp.task('img-resize', () => {
    // Make sure you install `graphicsmagick`

    const imageFormats = ['png', 'jpg', 'jpeg'];
    const resizableImages = `static/img/!(logo)/*.{${imageFormats.join(',')}}`;

    return gulp.src(resizableImages)
        .pipe(changed('static/img'))
        .pipe(resize({
            width: 650
        }))
        .pipe(gulp.dest('static/img'));
});

gulp.task('img-optim', () => {
    return gulp.src('static/img/**')
        .pipe(changed('static/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('static/img'));
});

gulp.task('default', gulp.parallel(
    'css',
    'js',
    gulp.series('img-resize', 'img-optim')
));
