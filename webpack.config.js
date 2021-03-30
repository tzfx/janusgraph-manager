/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

const isProd = (argv) => argv?.mode === 'production';

const dtsBundlerOpts = {
    name: 'janusgraphmanager',
    main: 'build/JanusGraphmanager.d.ts',
    baseDir: 'build',
    out: '../dist/index.d.ts',
    removeSource: false
};

module.exports = (_, argv) => ({
    mode: argv.mode ?? 'development',
    devtool: isProd(argv) ? 'inline-source-map' : false,
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
        minimize: isProd(argv)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd(argv) ? 'index.min.js' : 'index.js',
        // sourceMapFilename: 'index.js.map',
        library: {
                name: 'janusgraphmanager',
                type: 'commonjs'
        }
    },
})