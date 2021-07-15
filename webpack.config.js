const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const pageData = {
  "main": {
    "template": "./src/html/main/main.html",
    "meta": [
      {
        "name": "test-name",
        "value": "test value"
      }
    ],
    "title": "test title main",
    "chunk": "main"
},
  "career": {
    "template": "./src/html/career/career.html",
    "meta": [
      {
        "name": "test-name-career",
        "value": "test value"
      }
    ],
    "title": "test title career",
    "chunk": "career"
  },
  "projects": {
    "template": "./src/html/projects/projects.html",
    "meta": [
      {
        "name": "test-name-projects",
        "value": "test value"
      }
    ],
    "title": "test title projects",
    "chunk": "projects"
  },
  "ocean_cruises": {
    "template": "./src/html/project/project.tpl.html",
    "meta": [
      {
        "name": "test-name-ocean",
        "value": "test value"
      }
    ],
    "title": "test title ocean",
    "chunk": "project",
    "heading": "ocean_cruises Heading",
    "content": "ocean_cruises content lorem lorem",
  },
  "secure-document-management": {
    "template": "./src/html/project/project.tpl.html",
    "meta": [
      {
        "name": "test-name-secure",
        "value": "test value secure"
      }
    ],
    "title": "test title secure",
    "chunk": "project",
    "heading": "secure-document-management Heading",
    "content": "secure-document-management content lorem lorem",
  },
  "crm": {
    "template": "./src/html/project/project.tpl.html",
    "meta": [
      {
        "name": "test-name-crm",
        "value": "test value crm"
      }
    ],
    "title": "test title crm",
    "chunk": "project",
    "heading": "crm Heading",
    "content": "crm content lorem lorem"
  }
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
        main: './src/html/main/main.js',
        career: './src/html/career/career.js',
        projects: './src/html/projects/projects.js',
        project: './src/html/project/project.js'
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
        
      ]
    },
    plugins: [
      ...plugins,
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: './src/assets', to: `./assets` },
      ])
    ],
}
