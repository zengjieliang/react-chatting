const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader?cacheDirectory"
                }
            },
            {
                test: /\.less/,
                include: path.resolve(__dirname, "src"),
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.bmp$|\.svg$/i,
                use: {
                    loader:
                        "url-loader?limit=10&name=assets/images/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};