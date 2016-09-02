var gulp = require('gulp'),
	rev = require('gulp-rev'),
	revReplace = require('gulp-rev-replace'),
	useref = require('gulp-useref'),
	filter = require('gulp-filter'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpIf = require('gulp-if'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	base64 = require('gulp-base64'),
	del = require('del'),
	runSequence = require('run-sequence');

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	 .pipe(sass({style: 'expanded'}))
	 .pipe(autoprefixer())
	 .pipe(gulp.dest('app/css'))
	 .pipe(browserSync.reload({
	   stream: true
	 }))
});

gulp.task('index', function(){
	var jsFilter = filter("**/*.js", { restore: true });
  	var cssFilter = filter("**/*.css", { restore: true });
  	var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
  	return gulp.src('app/*.html')
	    .pipe(useref())
	    .pipe(jsFilter)
	    .pipe(sourcemaps.init())
	    .pipe(uglify())
	    .pipe(rev())
	    .pipe(sourcemaps.write('maps'))
	    .pipe(jsFilter.restore)
	    .pipe(cssFilter)
	    .pipe(cssnano())
	    .pipe(rev())
	    .pipe(cssFilter.restore)
	    .pipe(revReplace())
	    .pipe(gulp.dest('dist'))
});

gulp.task('imagemin', function () {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('base64', ['index'], function() {
  return gulp.src('app/css/*.css')
    .pipe(base64({
      baseDir: 'dist',
      extensions: ['png', /\.jpg#datauri$/i],
      exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
      maxImageSize: 3*1024, // bytes 
      debug: true
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
  	gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'index', 'base64','imagemin', 'fonts'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});