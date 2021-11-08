const process = require('process');
const path = require('path');
const fs = require('fs');
process.setMaxListeners(100);

const stdout = process.stdout;
const stdin = process.stdin;
const currentPath = path.join(__dirname, 'test.txt');

fs.writeFile(path.join(__dirname, 'test.txt'), '', err => {
  if (err) {
    throw err;
  }
})

stdout.write('Введите текст\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  process.on('SIGINT', () => {
    process.exit();
  });
  fs.appendFile(currentPath, data, err => {
    if (err) {
      throw err;
    }
  });
});

process.on('exit', () => stdout.write('Удачи!'));




























//! Please don't use the code below in production (it's just for testing features)

// Begin reading from stdin so the process does not exit.
// stdin.resume();

// stdin.on('data', (data) => stdout.write(data));

// function test() {
//   console.log('Exit');
//   console.log(process.stderr.fd);
//   console.log(process.stdin.read());
//   stdout.write('Node.js');
//   // console.log(stdout);
//   // console.log(process.env);
//   // fs.appendFile(currentPath, 'Hello NodeJS', err => {
//   //   if (err) {
//   //     throw err;
//   //   }
//   //   console.log('File appended');
//   // });
// }

// process.on('SIGINT', () => {
//   console.log('Received SIGINT. Press Control-D to exit.');
//   process.exit(test());
// });



// function handle(signal) {
//   console.log(`Received ${signal}`);
// }

// process.on('SIGINT', handle);
// process.on('SIGTERM', handle);