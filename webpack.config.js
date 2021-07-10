const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageData = {
    home: {
        title: 'Home Title',
        heading: 'Home Heading',
        content: 'Home content lorem lorem'
    },
    topic: {
        title: 'Topic Title',
        heading: 'Topic Heading',
        content: 'Topic content lorem'
    }
}

const entry = {
    home: './home/index.js',
    topic: './topic/index.js'
};

const plugins = [];

!(function(){
    let keys = Object.keys(entry);
    keys.map(key => {
        let htmlPlugin = new HtmlWebpackPlugin({
            title: `${pageData[key].title}`,
            template: './index.tpl.html',
            templateParameters: {
                'heading': `${pageData[key].heading}`,
                'content': `${pageData[key].content}`
            },
            chunks: [key],
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
    entry: entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: plugins
}

// new HtmlWebpackPlugin({
//     title: '和素燕一起学 webpack',
//     filename: 'index.html',
//     minify: {
//         removeComments: true,
//         // collapseWhitespace: true
//     },
//     meta: {
//         charset: { charset: 'utf-8' },
//         viewport: 'width=device-width, initial-scale=1'
//     },
//     // 控制 script 标签插入的位置
//     inject: "head",
//     favicon: 'favicon.png',
// }),