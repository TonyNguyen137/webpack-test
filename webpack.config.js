const path = require('node:path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        // add page templates here
        index: 'src/index.html', // save generated HTML into dist/index.html
      },
      js: {
        filename: 'js/[name].[contenthash:8].js', // JS output filename, used only if `inline` option is false
        //inline: true, // inline all JS
      },
      css: {
        filename: 'css/[name].[contenthash:8].css', // CSS output filename, used only if `inline` option is false
        //inline: true, // inline all CSS
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
  // enable live reload
  devServer: {
    static: path.join(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
