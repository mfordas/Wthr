const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname + '/Dist'),
    filename: 'index.js',
  },
    devtool: "source-map",
    resolve: {
      extensions: ['.js'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
              },
              {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: './img',
                  },
              },
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                }),

              }
            ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'Wthr.html',
        template: './src/html/index.html'
      }),
      new ExtractTextPlugin({
        filename: 'index.css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {discardComments: {removeAll: true}},
        canPrint: true
      }),
      new PurifyCSSPlugin({
        paths: glob.sync(path.resolve(__dirname, 'src/html/*.html')),
      })
    ]
}