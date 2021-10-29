import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    devtool: "inline-source-map",
    entry: path.resolve(__dirname, "src/example/index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[contenthash:5].js",
        publicPath: "/",
    },
    devServer: {
        open: true,
        port: 8081,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
        }),
    ],
    module: {
        rules: [{ test: /\.tsx?$/, loader: "babel-loader" }],
    },
};

export default config;
