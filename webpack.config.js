const path = require('path');

module.exports = {
  entry: './src/App.js', // Path to your main JS file
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/, // Add rule for .css files
        use: ['style-loader', 'css-loader'] // Use these loaders for CSS files
      }
    ]
  }
};
