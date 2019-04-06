/**
 * Client Package
 * 
 * Assuming packages folder structure:
 *  packages/
 *      [packageName]/
 *          public/         -- all public assets
 *          index.tsx
 * 
 * Outputs dist folder structure:
 *  dist/
 *      [packageName]/
 *          {.. public files ..}
 *          js/
 *              index.js
 * 
 * @param {*} PROJECT_ROOT 
 * @param {*} packageName 
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

function webpackClientServeConfiguration(PROJECT_ROOT, packageName, PORT) {
    const PACKAGES_DIR = path.join(PROJECT_ROOT, 'packages')
    const TMP_DIR = path.join(PROJECT_ROOT, 'tmp')
    return {
        mode: 'development',

        // The Typescript Entry file
        entry: path.join(PACKAGES_DIR, packageName, 'index.tsx'),
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
            alias: {
                common: path.resolve(`${PROJECT_ROOT}/src/common`),
                model: path.resolve(`${PROJECT_ROOT}/src/model`),
                apps: path.resolve(`${PROJECT_ROOT}/src/apps`),
                types: path.resolve(`${PROJECT_ROOT}/src/types`),
            },
        },
        output: {
            // Save the file in the JS folder
            filename: `js/index.js`,
            // Output the package to /dist
            path: path.join(TMP_DIR, packageName),
        },
        plugins: [
            // Copy all files from "/public" to the package root
            new CopyWebpackPlugin([
                { from: "**/*", to: `${packageName}/`, context: path.join(PACKAGES_DIR, packageName, 'public') }
            ])
        ],
        devServer: {
            // FIXME


            // Serve static files from the packages/[packageName]/public folder
            contentBase: path.join(PACKAGES_DIR, packageName, 'public'),
            // Watch changes in this folder
            watchContentBase: true,

            // publicPath: `/${packageName}/`,
            compress: true,
            port: PORT,
            open: true,
        },
        target: 'web',
    }
}

module.exports = {
    webpackClientServeConfiguration
}
