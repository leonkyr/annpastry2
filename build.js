var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var assets = require('metalsmith-assets');
var metadata = require('metalsmith-metadata');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .source('src/')
  .destination('./build')
  .use(metadata({
    "products": 'data/products.json'
  }))
  .use(collections({
    products: {
      pattern: 'products/*.md'
      metadata: 'data/products.json'
    }
  }))
  .use(permalinks({
    pattern: ':collection/:title'
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
  .build(function(error) {
    if (error) {
      console.log(error);
  }});