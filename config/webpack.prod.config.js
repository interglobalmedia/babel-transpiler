const webpack = require('webpack')
const merge = require('webpack-merge')

const ManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const baseConfig = require('./webpack.base.config')

const prodConfiguration = env =>
    merge([{
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1]
                            return `npm.${packageName.replace('@', '')}`
                        }
                    },
                    styles: {
                        name: 'main',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            },
            runtimeChunk: 'single',
            minimizer: [new UglifyJSPlugin(), new OptimizeCssAssetsPlugin()]
        },
        plugins: [
            new ManifestPlugin({
                fileName: 'asset-manifest.json'
            }),
            new webpack.HashedModuleIdsPlugin(),
            new Visualizer({
                filename: './statistics.html'
            })
        ]
    }])

module.exports = env => merge(baseConfig(env), prodConfiguration(env))