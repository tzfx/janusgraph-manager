/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/JanusGraphManager.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'janusgraph-manager.min.js',
        sourceMapFilename: 'janusgraph-manager.js.map',
        library: 'janusgraphmanager'
    }
}