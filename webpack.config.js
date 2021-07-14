const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pageData = {
    main: {
        template: './pages/main/main.html',
        title: 'Main Title',
        heading: 'Main Heading',
        content: 'Main content lorem lorem',
        chunk: 'main'
    },
    works: {
        template: './pages/works/works.html',
        title: 'Workssss Title',
        heading: 'Workssss Heading',
        content: 'Workssss content lorem lorem',
        chunk: 'works'
    },
    work1: {
        template: './pages/work/work.tpl.html',
        title: 'Work1 Title',
        heading: 'Work1 Heading',
        content: 'Work1 content lorem lorem',
        chunk: 'work'
    },
    // work2: {
    //     template: './pages/work.tpl.html',
    //     title: 'Work2 Title',
    //     heading: 'Work2 Heading',
    //     content: 'Work2 content lorem'
    // },
}
const plugins = [];

!(function(){
    let keys = Object.keys(pageData);
    keys.map(key => {
        let htmlPlugin = new HtmlWebpackPlugin({
            title: `${pageData[key].title}`,
            template: `${pageData[key].template}`,
            templateParameters: {
                'heading': `${pageData[key].heading}`,
                'content': `${pageData[key].content}`
            },
            chunks: ['index', `${pageData[key].chunk}`],
            filename: `${key}.html`,
            meta: {
                charset: { charset: 'utf-8' },
                viewport: 'width=device-width, initial-scale=1'
            },
            inject: "body",
            favicon: 'favicon.png',
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true
            // },
        });
        plugins.push(htmlPlugin);
    });
}());

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        index: 'main.html',
    },
    entry: {
        index: './index.js',
        main: './pages/main/main.js',
        works: './pages/works/works.js',
        work: './pages/work/work.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },    
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            "css-loader",
            // "postcss-loader",
            "sass-loader",
          ],
        },
      ]
    },
    plugins: [
      ...plugins,
      new MiniCssExtractPlugin(),
    ],
}

/*
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
    app: PATHS.src
  },
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist')
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
    ...plugins,
    // new HtmlWebpackPlugin({
    //   hash: false,
    //   template: `${PATHS.src}/index.html`,
    //   filename: "./index.html"
    // }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: "" }
    ]),
  ]
};

*/

