/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

const isProd = (argv) => argv?.mode === 'production';

const dtsBundlerOpts = {
    baseDir: 'build',
    main: 'build/JanusGraphManager.d.ts',
    name: 'janusgraphmanager',
    outputAsModuleFolder: true,
    out: '../dist/index.d.ts',
    removeSource: false,
};

module.exports = (_, argv) => ({
    devtool: isProd(argv) ? 'inline-source-map' : false,
    entry: './src/JanusGraphManager.ts',
    mode: argv.mode ?? 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: isProd(argv),
    },
    output: {
        filename: isProd(argv) ? 'index.min.js' : 'index.js',
        globalObject: 'this',
        library: {
            type: 'umd',
        },
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/',
    },
    plugins: [new DtsBundleWebpack(dtsBundlerOpts)],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
});
