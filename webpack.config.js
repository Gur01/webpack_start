const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: {
      main: './src/main.js'
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.pug$/,
          use: {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            'css-loader',
            // 'postcss-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              }
            },
            {
              loader: 'image-webpack-loader',
              options: devMode ? {} : {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                // webp: {
                //   quality: 75
                // }
              }
            },
          ],
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.pug"
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ],

    devServer: {
      overlay: true
    },

    devtool: devMode ? 'eval-source-map' : '',

    resolve: {
      alias: {
        '@': path.resolve(__dirname),
        'src': path.resolve(__dirname, 'src'),
        'dist': path.resolve(__dirname, 'dist'),
      }
    }
  }
}