'use strict';
// generated on 2015-08-04 using generator-ui-component 0.0.8
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
    return gulp.src('src/styles/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'nested',
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: ['last 10 versions','ie 8']
            })
        ]))
        .pipe($.sourcemaps.write())
        .pipe($.size({
            title: 'styles'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('styles-min', ['styles'], function() {
    return gulp.src('dist/*.css')
        .pipe($.csso())
        .pipe($.rename({
            suffix: ".min",
        }))
        .pipe($.size({
            title: 'styles-min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('src/scripts/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size({
            title: 'scripts'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-min', ['js'], function() {
    return gulp.src('dist/*.js')
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min",
        }))
        .pipe($.size({
            title: 'scripts-min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                cleanupIDs: false
            }]
        }))
        .pipe($.size({
            title: 'images'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist','.dist-demo']));

gulp.task('serve', ['default'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./','dist']
        }
    });

    gulp.watch([
        '*.html',
        'dist/**/*'
    ]).on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['styles', 'js', 'images'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'default'
    }));
});

gulp.task('dist', ['styles-min', 'js-min', 'images'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'dist'
    }));
});

gulp.task('build', ['clean'], function() {
    gulp.start('dist');
});

gulp.task('copy-dist', function() {
    return gulp.src([
        'dist/**/*'
        ])
        .pipe(gulp.dest('.dist-demo/dist'));
});

gulp.task('copy-html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('.dist-demo'));
});

gulp.task('deploy',['copy-dist','copy-html'], function () {
    return gulp.src('.dist-demo/**/*')
        .pipe($.ghPages({
            force: true
    }));
});
