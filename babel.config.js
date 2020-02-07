const presets = [
    [
      '@babel/env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
          node: '6.11.3',
        },
        useBuiltIns: 'usage',
      },
    ],
  ];
  
  module.exports = { presets };
  