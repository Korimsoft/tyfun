const path = require("node:path");

module.exports = {
    mode: "production",
    target: 'web',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: 'index.js',
        library: {
            name: 'tyfun-[version]',
            type: 'umd',
        },
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    plugins: [

    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname + '/tsconfig.json'),

                    }
                }
            },
        ]
    }
}