var glob = require("glob");
var fs = require("fs");

var getDirectories = function (src, ext, callback) {
  glob(src + '/**/*' + ext, callback);
};
getDirectories('./webapp', "-dbg*.js", function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    res.forEach(function (path) {
      var x = path.split('-dbg');
      var originalFile = x[0] + x[1];
      fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
        fs.writeFile(originalFile, data, 'utf-8', function (err) {
          if (err) throw err;
          console.log('deminimification completed for ' + originalFile);
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
            }
          })
        });
      });
    });
  }
});
