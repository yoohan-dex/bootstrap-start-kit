

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
  notify = require('gulp-notify'),
   bower = require('gulp-bower');
  
var postcss       = require('gulp-postcss');

var autoprefixer  = require('autoprefixer');  
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
}

gulp.task('bower', () => {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
})
gulp.task('icons', () => {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./public/fonts'))
})

gulp.task('css', () => {
   var processors = [
    
    
  ];
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: [
        './resources/sass',
        config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
        config.bowerDir + '/fontawesome/scss',
      ]
    })
      .on('error', notify.onError(() => {
        return 'Error:' + error.message;
      }))
    )
    
    .pipe(gulp.dest('./public/css'))
});
gulp.task('watch', () => {
  gulp.watch(config.sassPath + '/**/*.scss', ['css'])
})

gulp.task('serve',['bower', 'icons','css', 'watch'],function(){
  browserSync.init({
    open: true,
    port: 8080,
    server: {
      baseDir: "./public"
    }
    
  });
})

gulp.task('default', ['serve']);