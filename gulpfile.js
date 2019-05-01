const
    gulp = require("gulp"),
    rollup = require('rollup'),
    rollupTypescript = require('rollup-plugin-typescript'),
    // tslint = require('rollup-plugin-tslint'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify-es').default,
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    ts = require("gulp-typescript"),
    del = require('del'),
    sass = require('gulp-sass'),
    tsProject = ts.createProject("tsconfig.json"),
    moduleName = 'editor',
    sassFolder = './src/styles',
    srcFolder = './src',
    filePath = `./${getOutputFolderName()}/${moduleName}.js`;

function getOutputFolderName() {
    const outDir = tsProject.options.outDir.split('/');
    return outDir[outDir.length - 1];
}

gulp.task('clean', () => {
    return del(getOutputFolderName());
});

gulp.task('sass', () => {
    return gulp.src(`${sassFolder}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(concat(`${moduleName}.css`))
        .pipe(gulp.dest(`./${getOutputFolderName()}`))
        .pipe(uglifycss())
        .pipe(rename(`${moduleName}.min.css`))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(`./${getOutputFolderName()}`));
});

gulp.task('script', () => {
    return rollup.rollup({
        input: `${srcFolder}/index.ts`,
        plugins: [
            nodeResolve(),
            rollupTypescript(),
            // tslint()
        ]
    }).then(bundle => {
        bundle.write({
            file: filePath,
            format: 'umd',
            name: moduleName
        }).then(() => {
            gulp.src(filePath)
                .pipe(gulp.dest(`./${getOutputFolderName()}`))
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(rename(`${moduleName}.min.js`))
                .pipe(sourcemaps.write(''))
                .pipe(gulp.dest(`./${getOutputFolderName()}`));
        });
    });
});

gulp.task('build', gulp.series('clean', gulp.series('sass', 'script')));

gulp.task('default', gulp.series('clean', gulp.series('sass', 'script', () => {
    browserSync.init({
        server: {
            baseDir: './',
            // files: [
            //     'dist/*.css',
            //     'dist/*.js',
            // ]
        }
    });
    gulp.watch(`${srcFolder}/**/*.ts`, gulp.parallel('script', (done) => {
        browserSync.reload();
        done();
    }));
    gulp.watch(`${sassFolder}/**/*.scss`, gulp.parallel('sass', 'script', (done) => {
        browserSync.reload();
        done();
    }));
})));
