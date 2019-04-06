/**
 * Meta Package
 * @param {*} PROJECT_ROOT 
 * @param {*} packageName 
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

function webpackMetaConfiguration(PROJECT_ROOT, packageName) {
    const PACKAGES_DIR = path.join(PROJECT_ROOT, 'packages')
    const DIST_DIR = path.join(PROJECT_ROOT, 'dist')
    return {
        mode: 'development',

        // The Typescript Entry file (because Webpack needs one)
        entry: path.join(PACKAGES_DIR, packageName, 'index.ts'),
        output: {
            // Save the file in the JS folder
            filename: `${packageName}/index.js`,
            // Output the package to /dist
            path: DIST_DIR,
        },
        plugins: [
            // Copy the JSON file(s)
            new CopyWebpackPlugin([
                `**/*.json`
            ], { context: PACKAGES_DIR }),
            // Lambdas expect zipped source code
            new ZipPlugin({
                // Make sure that the index file is at the root of the zip
                pathMapper: (path) => { return path.replace(packageName + '/', ''); },
                filename: `${packageName}.zip`,
            }),
        ]
    }
}

module.exports = {
    webpackMetaConfiguration
}
