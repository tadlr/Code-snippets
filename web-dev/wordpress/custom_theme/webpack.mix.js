const mix = require('laravel-mix');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('laravel-mix-polyfill');

const productionSourceMaps = true;

mix
  .js('assets/js/src/app.js', 'assets/js/dist/app.js')

  .js(
    'assets/js/src/savings-calculator.js',
    'assets/js/dist/savings-calculator.js',
  )

  .js('assets/js/src/browser-sync.js', 'assets/js/dist/browser-sync.min.js')
  .sourceMaps(productionSourceMaps, 'source-map')
  .version();

mix
  .polyfill({
    enabled: true,
    useBuiltIns: 'entry',
    targets: '> 0.5%, last 2 versions',
  })
  .js(
    'assets/js/src/theme/polyfills/additional-polyfills-init.js',
    'assets/js/dist/theme-scripts/additional-polyfills.js',
  )
  .js('assets/js/src/theme/app.js', 'assets/js/dist/theme-scripts')
  .sourceMaps(productionSourceMaps, 'source-map')
  .extract();

mix.setPublicPath('./assets/');

mix.options({
  terser: {
    extractComments: false,
    terserOptions: {
      compress: {
        drop_console: true, // Removes console logs for production
      },
    },
  },
});

mix.autoload({
  jquery: ['$', 'window.jQuery'],
});

mix.webpackConfig({
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: ['jsmart-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },

  output: {
    publicPath: './',
    filename: '[name].js',

    chunkFilename: './[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
  resolve: {
    alias: {
      '@plugins': path.resolve(__dirname, 'assets/js/src/theme/plugins'),
    },
  },
});

mix.disableSuccessNotifications();
