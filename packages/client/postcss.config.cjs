// PostCSS configuration
module.exports = cfg => {
  // import tokens as Sass variables
  const variables = require('./tokens.json')

  const dev = cfg.env === 'development'

  return {
    map: dev ? { inline: false } : false,
    plugins: [
      require('postcss-advanced-variables')({ variables }),
      require('postcss-map-get')(),
      require('postcss-nested')(),
      require('postcss-sort-media-queries')(),
      require('postcss-assets')({
        loadPaths: ['src/assets/'],
      }),
      require('autoprefixer')(),
    ],
  }
}
