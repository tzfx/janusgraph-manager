/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

const dtsBundlerOpts = {
    name: 'janusgraphmanager',
    main: 'build/JanusGraphmanager.d.ts',
    baseDir: 'build',
    out: '../dist/index.d.ts',
    removeSource: false
};

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
    plugins: [
        new DtsBundleWebpack(dtsBundlerOpts)
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.min.js',
        sourceMapFilename: 'index.js.map',
        library: 'janusgraphmanager',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
}