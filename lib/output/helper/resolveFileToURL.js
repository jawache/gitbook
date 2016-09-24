var LocationUtils = require('../../utils/location');

var fileToURL = require('./fileToURL');

/**
 * Resolve an absolute path (extracted from a link)
 *
 * @param {Output} output
 * @param {String} filePath
 * @return {String}
 */
function resolveFileToURL(output, filePath) {
    // Convert /test.png -> test.png
    filePath = LocationUtils.toAbsolute(filePath, '', '');

    var page = output.getPage(filePath);

    // if file is a page, return correct .html url
    if (page) {
        filePath = fileToURL(output, filePath);
    }

    let fp = LocationUtils.normalize(filePath);
    console.log(`resolveFileToURL ${filePath} -> ${fp}`);
    return fp;
}

module.exports = resolveFileToURL;
