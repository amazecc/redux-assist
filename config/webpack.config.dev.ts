import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    devtool: "inline-source-map",
    entry: path.resolve(__dirname, "../demo/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        chunkFilename: "js/[name].[hash:5].js",
        filename: "js/[name].[hash:5].js"
    },
    devServer: {
        open: true,
        disableHostCheck: true,
        port: 8081
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico"
        })
    ],
    module: {
        rules: [{ test: /\.tsx?$/, loader: "babel-loader" }]
    }
};

export default config;
