const path = require('path');

const appSrc = path.resolve(__dirname, 'src');
const appNodeModules = path.resolve(__dirname, 'node_modules');

module.exports = {
    resolve: {
        modules: ['node_modules', appNodeModules],
        extensions: [
            '.ts',
            '.js',
            '.json'
        ],
        alias: {
            '@src': appSrc
        }
    },
    output: {
        libraryExport: 'default',
        libraryTarget: 'umd',
        library: 'editor'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader')
            },
            {
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
                        enforce: 'pre',
                        use: [
                            require.resolve('babel-loader'),
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    transpileOnly: true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
