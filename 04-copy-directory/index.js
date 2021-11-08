const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, 'files');
const newPath = `${currentPath}-copy`;

fs.rm(newPath, { recursive: true }, err => {
  if (err) {
    if (err.code === 'ENOENT') {
      copyDir();
      return;
    }
    throw err;
  };
  copyDir();
  // console.log(`${newPath} folder was removed`);
})

async function copyDir() {
  function compile(files, arr) {
    for (let file of files) {
      if (!file.isDirectory()) {
        arr.push(file.name);
      }
    }
  }

  fs.readdir(currentPath, { encoding: 'utf8', withFileTypes: 'true' }, (err, content) => {
    if (err) { throw err };

    fs.mkdir(newPath, { recursive: true }, err => {
      if (err) { throw err };
      // console.log('Folder created');

      const array = [];
      compile(content, array);
      // console.log(array);

      for (let i = 0; i < array.length; i++) {
        let prevPath = path.join(currentPath, array[i]);
        let newCurrentPath = path.join(newPath, array[i]);

        fs.copyFile(prevPath, newCurrentPath, err => {
          if (err) {
            if (err.code === 'ENOENT') {
              fs.rm(newCurrentPath, err => {
                if (err) {
                  if (err.code === 'ENOENT') {
                    return;
                  } else {
                    throw err;
                  }
                }
              });
            } else {
              throw err;
            }
          }
          // console.log('File copied');
        })
      }
    });
  });
}



