const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {

    return {
        entry: "./src/index.tsx",
        mode: argv.mode,
        devServer: {
            watchFiles: "src/**/*",
            port: 3000,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, "src"),
                    use: ["style-loader", "css-loader", "postcss-loader"]

                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"]
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: "src/index.html", to: "index.html" }]
            }),
            new ESLintPlugin()
        ],
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        }
    }
}