module.exports = {
    entry: './index.ts',
    output: {
        filename: './index.js',
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};