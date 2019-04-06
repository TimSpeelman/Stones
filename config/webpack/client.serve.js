const path = require('path')
const ports = require('../ports')

const PROJECT_ROOT = path.join(__dirname, '../../');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

module.exports = {
    mode: 'development',

    // The Typescript Entry file
    entry: path.join(PROJECT_ROOT, 'src', 'index.tsx'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            // All .css files
            { test: /\.css$/, use: ['style-loader', 'css-loader'], },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', ".json"],
    },
    output: {
        // Save the file in the JS folder
        filename: `js/index.js`,
        // Output the package to /dist
        path: DIST_DIR,
    },
    plugins: [
        // Copy all files from "/public" to the package root
        // new CopyWebpackPlugin([
        //     { from: "**/*", to: `${packageName}/`, context: path.join(PACKAGES_DIR, packageName, 'public') }
        // ])
    ],
    devServer: {
        // Serve static files from the packages/[packageName]/public folder
        contentBase: path.join(PUBLIC_DIR),
        // Watch changes in this folder
        watchContentBase: true,

        // publicPath: `/${packageName}/`,
        compress: true,
        port: ports.client,
        open: true,
    },
    target: 'web',
};
