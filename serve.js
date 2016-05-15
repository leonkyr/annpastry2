var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var permalinks = require('metalsmith-permalinks');
var browserSync = require('metalsmith-browser-sync');
var metadata = require('metalsmith-metadata');

Metalsmith(__dirname)
  .source('src/')
  .destination('./build')
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(metadata({
    products: 'data/products.json'
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(assets({
    source: './assets', // relative to the working directory
    destination: './' // relative to the build directory
  }))
  .use(browserSync({
    server: './build',
    files: ['src/**/*.*','layouts/*.html','partials/*.html']
  }))
  .build(function(error) {
    if (error) {
      console.log(error);
    }
  });
