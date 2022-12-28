module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'GfA Kalender Aufbereitung'
    }
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
