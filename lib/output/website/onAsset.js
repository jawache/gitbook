var path = require('path');
var fs = require('../../utils/fs');
var mkdirp = require('mkdirp');

/**
 Copy an asset to the output folder

 @param {Output} output
 @param {Page} page
 */
function onAsset(output, asset) {
  var book = output.getBook();
  var options = output.getOptions();
  var bookFS = book.getContentFS();

  var outputFolder = options.get('root');
  var outputPath = path.resolve(outputFolder, asset);

  return fs.ensureFile(outputPath)
    .then(function () {
      return bookFS.readAsStream(asset)
        .then(function (stream) {
          //HACK - AH
          let outputDir = path.dirname(outputPath).replace(/\d+\./g, '');
          outputPath = path.join(outputDir, path.basename(outputPath));
          return fs.mkdirp(outputDir)
            .then(function() {
              return fs.writeStream(outputPath, stream);
            });

        });
    })
    .thenResolve(output);
}

module.exports = onAsset;
