/**
 * 
 * For using Webpack with TypeScript:
 * @see https://webpack.js.org/guides/typescript/
 * 
 * If Build Performance is too slow:
 * @see https://webpack.js.org/guides/build-performance/
 */

const { webpackClientConfiguration } = require('./config/templates/webpack/webpack.clients')

const PROJECT_ROOT = __dirname;

module.exports = [
    webpackClientConfiguration(PROJECT_ROOT, 'hello-client'),
];
