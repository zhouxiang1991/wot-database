module.exports = {
  presets: ['@vue/app'],
  plugins: [
    '@babel/plugin-proposal-throw-expressions',
    [
      '@babel/plugin-proposal-pipeline-operator',
      { 'proposal': 'minimal' },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    [
      'import',
      {
        libraryName: 'iview',
        libraryDirectory: 'src/components',
      },
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
