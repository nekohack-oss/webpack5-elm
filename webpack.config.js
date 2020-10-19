const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: ['elm-webpack-loader'],
            },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: ['style-loader', 'css-loader']
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.elm'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        assetModuleFilename: 'img/[name].[hash:7][ext]',
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
        }),
    ],

    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },

    devServer: {
        contentBase: __dirname + 'src/assets',
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        before(app) {
            app.get('/test', function (req, res) {
                res.json({
                    result: 'OK',
                })
            })
        },
    },
}
