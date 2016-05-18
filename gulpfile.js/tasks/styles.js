'use strict';
var config = require('../config'),
    notifyError = require('../lib/notifyError');

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    size = require('gulp-size'),
    sass = require('gulp-sass'),
    scss = require("postcss-scss"),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

// PostCSS plugins
var autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    rucksack = require('rucksack-css'),
    reporter = require('postcss-reporter'),
    cssnano = require('cssnano');

gulp.task('styles', ['cssLint'], function() {
    
    var plugins = [
        lost,
        rucksack({fallbacks: true}),
        autoprefixer(config.postcssPlugins.autoprefixer.browsers),
        cssnano({safe: true, discardComments: {removeAll: true}})
    ];

    gulp.src(config.src.scss)
        .pipe(plumber({errorHandler: notifyError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(rename(config.opts.renamemin))
        .pipe(size(config.tasks.size.opts))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(browserSync.stream()) 
});
