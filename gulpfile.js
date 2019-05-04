const gulp = require("gulp"),
    webpack = require("webpack-stream"),
    webpackConfig = require("./webpack.config"),
    named = require("vinyl-named"),
    browserSync = require("browser-sync").create(),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify-es").default,
    uglifycss = require("gulp-uglifycss"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    ts = require("gulp-typescript"),
    del = require("del"),
    sass = require("gulp-sass"),
    tsProject = ts.createProject("tsconfig.json"),
    moduleName = "editor",
    sassFolder = "./src/styles",
    srcFolder = "./src",
    filePath = `./${getOutputFolderName()}/${moduleName}.js`;

function getOutputFolderName() {
    const outDir = tsProject.options.outDir.split("/");
    return outDir[outDir.length - 1];
}

gulp.task("clean", () => {
    return del(getOutputFolderName());
});

gulp.task("sass", () => {
    return gulp
        .src([`${sassFolder}/**/*.scss`, `${sassFolder}/**/*.css`])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(concat(`${moduleName}.css`))
        .pipe(gulp.dest(`./${getOutputFolderName()}`))
        .pipe(uglifycss())
        .pipe(rename(`${moduleName}.min.css`))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest(`./${getOutputFolderName()}`));
});

gulp.task("copy-fonts", () => {
    return gulp
        .src(`${sassFolder}/fonts/*`)
        .pipe(gulp.dest(`./${getOutputFolderName()}/fonts`));
});

function generateScript(webpackConfig) {
    return gulp
        .src(`${srcFolder}/index.ts`)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(rename(`${moduleName}.js`))
        .pipe(gulp.dest(`./${getOutputFolderName()}`))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(`${moduleName}.min.js`))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest(`./${getOutputFolderName()}`));
}

gulp.task("script", () => {
    const config = { ...{}, ...webpackConfig };
    config.mode = "development";
    return generateScript(config);
});

gulp.task(
    "build",
    gulp.series(
        "clean",
        gulp.series(
            () => {
                const config = { ...{}, ...webpackConfig };
                config.mode = "production";
                return generateScript(config);
            },
            "sass",
            "copy-fonts"
        )
    )
);

gulp.task(
    "default",
    gulp.series(
        "clean",
        gulp.series("script", "sass", "copy-fonts", () => {
            browserSync.init({
                server: {
                    baseDir: "./"
                    // files: [
                    //     'dist/*.css',
                    //     'dist/*.js',
                    // ]
                }
            });
            gulp.watch(
                `${srcFolder}/**/*.ts`,
                gulp.series("script", done => {
                    browserSync.reload();
                    done();
                })
            );
            gulp.watch(
                [`${sassFolder}/**/*.scss`, `${sassFolder}/**/*.css`],
                gulp.series("script", "sass", "copy-fonts", done => {
                    browserSync.reload();
                    done();
                })
            );
        })
    )
);
