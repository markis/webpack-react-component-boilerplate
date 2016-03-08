/* eslint-env node */
/* eslint-global env */
const path = require('path');
const webpack = require('webpack');
const config = require('package')('.');

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
  process.env.BABEL_ENV = 'production';
  const mainFile = path.parse(config.main);

  module.exports = {
    entry: './src/index.js',

    output: {
      path: mainFile.dir,
      filename: mainFile.base,
      library: config.name,
      libraryTarget: 'commonjs'
    },

    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      jquery: 'jquery',
      react: 'react',
      'react-dom': 'react-dom'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: [
            path.resolve(process.cwd(), './src')
          ],
          query: {
            plugins: ['transform-runtime']
          }
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        }
      ]
    }
  };
} else {
  const hostDir = path.join(process.cwd(), 'dev-host');
  module.exports = {
    devtool: 'cheap-inline-module-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.join(hostDir, './client')
    ],

    output: {
      path: path.join(hostDir, '.'),
      publicPath: '/',
      filename: 'bundle.js'
    },

    resolve: {
      alias: {
        Component: path.join(hostDir, '../src')
      },
      extensions: ['', '.js']
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
      contentBase: hostDir
    },

    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          hostDir,
          path.resolve(hostDir, '../src')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }]
    }
  };
}

