const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const imagemin = require('gulp-imagemin');

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

gulp.task('img', () => {
    return gulp.src('static/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('static/img'));

    // TODO: Check widths
});

gulp.task('default', gulp.parallel('css', 'js', 'img'));
