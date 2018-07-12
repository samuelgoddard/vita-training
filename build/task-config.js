const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const path = require('path');
const watch = require('gulp-watch');

const styleguideDevTask = require('./tasks/styleguide-dev');
const styleguideBuildTask = require('./tasks/styleguide-build');

const sassImporter = require('node-sass-magic-importer');

const resolve = require('./lib/resolve');

module.exports = {
  html        : false,
  images      : true,
  fonts       : false,
  static      : false,
  svgSprite   : false,
  ghPages     : false,
  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 versions"]
    },
    sass: {
      includePaths: [
        "./node_modules"
      ],
      importer: sassImporter(),
    },
    extensions: ["sass", "scss", "css"]
  },

   // JS Config
  javascripts: {
    // Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the javascripts folder. This maps directly to webpackConfig.entry.
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: [
        './main.js'
      ],
    },
    publicPath: "/assets/js",
    extensions: ['js', 'vue', 'json'],
    alias: {
      '@': resolve('assets/js'),
    },
    // The public path to your assets on your server. Only needed if this differs from the result of path.join(PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest). Maps directly to webpackConfig.publicPath
    // publicPath: 'public',
    loaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src')],
        exclude: [resolve('node_modules')],
        enforce: 'pre',
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ya?ml$/,
        loader: 'yml-loader'
      },
    ]
  },

  browserSync: {
    files: ["public/*.html"],
    proxy: "http://localhost:3000", //Craft or backend server here
  },

  production: {
    rev: true,
    devtool: 'source-map',
  },

  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      gulp.task('styleguideDev', styleguideDevTask);
      gulp.task('styleguideBuild', styleguideBuildTask);
    },
    development: {
        prebuild: ['styleguideDev'],
    }
  }
}
