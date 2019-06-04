module.exports = {
  presets: ['@vue/app', '@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      'component',
      {
        // libraryName: 'element-ui',
        styleLibraryName: '~theme'
      }
    ]
  ]
};
