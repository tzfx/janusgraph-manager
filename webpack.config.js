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

module.exports = (_, argv) => ({
    mode: argv.mode ?? 'development',
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
    optimization: {
        minimize: argv.mode === 'production'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: argv.mode === 'production' ? 'index.min.js' : 'index.js',
        sourceMapFilename: 'index.js.map',
        library: 'janusgraphmanager',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
})