const fs = require('fs');
const path = require('path');
let folderToCheck = 'secret-folder';
const folderPath = path.join(__dirname, folderToCheck);


function compile(files, arr) {
  const pathBeforeFileName = path.join(__dirname, folderToCheck);

  for (let file of files) {
    if (!file.isDirectory()) {
      arr.push(path.join(pathBeforeFileName, file.name));
    }
  }
}

fs.readdir(folderPath, { encoding: 'utf8', withFileTypes: 'true' }, (err, content) => {
  // Dirent obj returns if {withFileTypes: 'true'} param is used
  if (err) {
    throw err;
  }

  const array = [];
  compile(content, array);

  for (let i = 0; i < array.length; i++) {
    fs.stat(array[i], (err, res) => {
      if (err) {
        throw err;
      }
      let base = path.basename(array[i]);
      let baseLen = base.split('.').length;
      let ext = path.extname(array[i]).split('.').join('');

      console.log((baseLen === 1)
        ? `${base.split('.')} - ${ext} - ${(res.size / 1024).toFixed(3)}kb`
        : `${base.split('.').splice(0, baseLen - 1).join('.')} - ${ext} - ${(res.size / 1024).toFixed(3)}kb`);
    })
  }
});


