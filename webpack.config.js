const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageData = {
    works: {
        template: './works.html',
        title: 'Workssss Title',
        heading: 'Workssss Heading',
        content: 'Workssss content lorem lorem'
    },
    work1: {
        template: './work.tpl.html',
        title: 'Work1 Title',
        heading: 'Work1 Heading',
        content: 'Work1 content lorem lorem'
    },
    work2: {
        template: './work.tpl.html',
        title: 'Work2 Title',
        heading: 'Work2 Heading',
        content: 'Work2 content lorem'
    },
}

// const entry = {
//     home: './home/index.js',
//     topic: './topic/index.js'
// };

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
            // chunks: [key],
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

module.exports = {
    mode: 'development',
    entry: './index.js',
    // entry: entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: plugins
}

