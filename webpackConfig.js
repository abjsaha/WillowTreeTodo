var dependencies = Object.keys(require('./package.json').dependencies);
var webpack = require('webpack');
var config = require('./config');
var path = require('path');

module.exports = {
    cache: true,
    watch: true,
    watchDelay: 200,
    //devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:'+config.port,
        'webpack/hot/dev-server',
        './client/src/js/main'
    ],
    output: {
        path: __dirname + '/client/public/js',
        filename: 'main.js',
        publicPath: '/public/js/'
    },
    module: {
        loaders: [
            { test: /\.js$/,  loaders: ['react-hot', "jsx-loader?harmony&stripTypes&es5"] },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(eot|woff)$/, loader: "file-loader" },
            { test: /.ttf([\?]?.*)$/, loader: "file-loader" }
            //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, '/client/src/js')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("development")
            }
        })
    ]
};
