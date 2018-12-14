var path = require("path");
var config = {
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    entry: ["./src/App/index.tsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [/node_modules/]
            }
        ]
    },

    watch: true,
};

module.exports = config;