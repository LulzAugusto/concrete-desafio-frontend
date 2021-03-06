'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	$ = require('gulp-load-plugins')();

var serverIsOnline = false;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function() {
	return gulp.src(['src/assets/css/styles.scss'])
		.pipe($.plumber())
		.pipe($.rubySass({
			style: 'expanded',
			precision: 10,
			'sourcemap=none': true
		}))
		.pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
		.pipe(gulp.dest('.tmp/styles'))
		.pipe($.minifyCss())
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('jshint', function() {
	return gulp.src('src/app/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!serverIsOnline, $.jshint.reporter('fail')));
});

gulp.task('serve:dev', function() {
	runSequence('connect', 'watch');
});

gulp.task('connect', ['styles', 'jshint'], function() {
	var http = require('http'),
		serveStatic = require('serve-static'),
		serveIndex = require('serve-index'),
		connect = require('connect'),
		liveReload = require('connect-livereload'),
		app = connect()
		.use(liveReload({port: 35729}))
		.use(serveStatic('.tmp'))
		.use(serveStatic('src'))
		.use('/bower_components', serveStatic('bower_components'))
		.use(serveIndex('src'));

	http.createServer(app)
		.listen(3000)
		.on('listening', function() {
			serverIsOnline = true;
			console.log('Started connect web server on http://localhost:3000');
		});
});

gulp.task('watch', function() {
	$.livereload.listen();

	gulp.watch([
		'src/**/*.{scss,css,html,js}',
	]).on('change', $.livereload.changed);

	gulp.watch(['src/assets/css/**/*.{scss,css}'], ['styles']);
	gulp.watch(['src/app/**/*.js'], ['jshint']);
});

gulp.task('js', function() {
	return gulp.src([
			'bower_components/angular/angular.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-route/angular-route.js',
			'src/app/**/*.module.js',
			'.tmp/templates/*.js',
			'src/app/**/*.js'
		])
		.pipe($.ngAnnotate())
		.pipe($.concat('app.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
	return gulp.src('src/app/**/*.html')
		.pipe($.angularTemplatecache('templates.js', {
			module: 'app.core',
			root: 'app'
			// standalone: true
		}))
		.pipe(gulp.dest('.tmp/templates'));
});

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe($.inject(gulp.src('dist/js/*.js', {read: false}), {relative: true, ignorePath: '../dist'}))
		.pipe($.minifyHtml())
		.pipe(gulp.dest('dist'));
});
