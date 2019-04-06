/**
 * Server Package
 * 
 * Assuming packages folder structure:
 *  packages/
 *      [packageName]/
 *          index.ts
 * 
 * Outputs dist folder structure:
 *  dist/
 *      [packageName].zip
 *      [packageName]/
 *          index.js
 * 
 * @param {*} PROJECT_ROOT 
 * @param {*} packageName 
 */

const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

function webpackServerConfiguration(PROJECT_ROOT, packageName) {
    const PACKAGES_DIR = path.join(PROJECT_ROOT, 'packages')
    const DIST_DIR = path.join(PROJECT_ROOT, 'dist')
    return {
        mode: 'development',

        // The Typescript Entry file
        entry: path.join(PACKAGES_DIR, packageName, 'index.ts'),
        devtool: 'inline-source-map',
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
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
            filename: `${packageName}/index.js`,
            // Output the package to /dist
            path: DIST_DIR,
            library: packageName,
            libraryTarget: 'umd',
        },
        target: 'node',
        plugins: [
            // Lambdas expect zipped source code
            new ZipPlugin({
                // Make sure that the index file is at the root of the zip
                pathMapper: (path) => { return path.replace(packageName + '/', ''); },
                filename: `${packageName}.zip`,
            }),
        ],
    }
}

module.exports = {
    webpackServerConfiguration
}
