module.exports = {
    entry: './index.ts',
    output: {
        filename: './prima.js',
        library: 'Prima',
        libraryTarget: 'umd'
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
