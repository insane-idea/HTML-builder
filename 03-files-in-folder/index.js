const fs = require('fs'); //stat
const path = require('path'); // path.extname(path)
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
      console.log(`${path.basename(array[i]).split('.').join(' - ')} - ${(res.size / 1024).toFixed(3)}kb`);
    })
  }
});
