const path = require("path");
const fs = require("fs");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./src/html/pages");

const config = {
  entry: ["./src/scripts/index.js", "./src/styles/style.scss"],
  output: {
    filename: "./scripts/bundle.js"
  },
  devtool: "source-map",
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src/styles"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                cssnano({
                  preset: [
                    "default",
                    {
                      discardComments: {
                        removeAll: true
                      }
                    }
                  ]
                }),
                autoprefixer({
                  browsers:['ie >= 8', 'last 4 version']
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/html/components"),
        use: ["raw-loader"]
      }
    ]
  },
  plugins: [
    // Adding jQuery with ProvidePlugin
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // end jQuery
    new MiniCssExtractPlugin({
      filename: "./css/style.bundle.css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./node_modules/font-awesome/fonts",
        to: "./fonts"
      },
      {
        from: "./src/fonts",
        to: "./fonts"
      },
      {
        from: "./src/images",
        to: "./images"
      }
    ])
  ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(new CleanWebpackPlugin("dist"));
  }
  return config;
};
