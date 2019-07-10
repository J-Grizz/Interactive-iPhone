const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', () =>
  gulp.src('stylesheets/*.css')
  .pipe(autoprefixer({
    browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
    cascade: false
  }))
  .pipe(gulp.dest('build'))
);

gulp.task('watch', () => {
  gulp.watch('stylesheets/*.css', gulp.series('styles'));
});