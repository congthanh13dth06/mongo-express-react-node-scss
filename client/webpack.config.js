import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OpenBrowserPlugin from 'open-browser-webpack-plugin'

import AppConfig from './src/config/app.conf.json'

const isDev = process.env['mode'].trim() === 'development';

const time = new Date().getTime()

export default {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.js')],
  output: {
    path: path.join(__dirname, 'build'),
    filename: `assets/js/bundle.min.js?v=${time}`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          uglifyOptions: {
            mangle: true,
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.ico'),
        minify: {
          removeAttributeQoutes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/",
    compress: true,
    port: AppConfig.PORT,
    host: "localhost",
    stats: 'minimal',
    historyApiFallback: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: isDev ? '[local]_[hash:base64:5]' : 'Mari_Đẹp_Gái_Nhất_Intelin_[hash:base64:10]_',
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts'
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]__[hash].min.css`,
      chunkFilename: `[name]__[hash].min.css`
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
      minify: {
        removeAttributeQoutes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new OpenBrowserPlugin({url: `http://localhost:${AppConfig.PORT}`}),
    new CleanWebpackPlugin()
  ]
};
