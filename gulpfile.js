var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass')(require('sass'));
var git = require('simple-git');
var cleanCSS = require('gulp-clean-css');

// BORRAR LA CARPETA STYLES ANTES
gulp.task('borrar', function() {
  return gulp.src('./styles/*', { read: false, allowEmpty: false })
    .pipe(clean());
});

// GENERAR LAS HOJAS DE ESTILOS A PARTIR DE LOS FICHEROS .SCSS en Styles.
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('styles'));
});

// LIMPIAR CSS Y CONDENSARLO
gulp.task('minificarCSS', function() {
  return gulp.src('styles/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('styles'));
});

// SUBIR EL PROYECTO A GITHUB
gulp.task('subirGitHub', function (done) {
    git()
      .add('.')
      .commit('Subir cambios')
      .push('origin', 'main');
  });

// Tarea:
gulp.task('default', gulp.series('borrar', 'sass', 'minificarCSS', 'subirGitHub'));