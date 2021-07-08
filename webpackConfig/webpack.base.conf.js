const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../public"),
  assets: "assets/"
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    main: PATHS.src + '/js/main/main.js',
    login: PATHS.src + '/js/login/login.js',
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(sc|sa)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: `${PATHS.src}/js/postcss.config.js` }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: `${PATHS.src}/js/postcss.config.js` }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new HtmlWebpackPlugin({
      // hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "index.html",
      chunks: ['app', 'main'],
      excludeChunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      // hash: false,
      template: `${PATHS.src}/login.html`,
      filename: "login.html",
      chunks: ['app', 'login'],
      excludeChunks: [ 'main' ],
    }),
    new HtmlWebpackPlugin({
      // hash: false,
      template: `${PATHS.src}/posts.html`,
      filename: "posts.html",
      // chunks: ['app', 'login'],
      excludeChunks: [ 'main', 'login' ],
    }),
    new HtmlWebpackPlugin({
      // hash: false,
      template: `${PATHS.src}/post.html`,
      filename: "post.html",
      // chunks: ['app', 'login'],
      excludeChunks: [ 'main', 'login' ],
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: "" }
    ])
  ]
};
