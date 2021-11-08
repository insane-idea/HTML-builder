const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf8');
let data = '';

readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log(data));
readStream.on('error', err => console.log(err.message));







































//! Please don't use the code below in production (it's just for testing features)

// readStream.on('close', () => console.log('Finished'));


// const { Readable } = require('stream');
// class Counter extends Readable {
//   constructor(opt) {
//     super(opt);
//     this._max = 1000;
//     this._index = 0;
//   }

//   _read() {
//     this._index += 1;
//     if (this._index > this._max) {
//       this.push(null);
//     } else {
//       const buf = Buffer.from(`${this._index}`, 'utf8');
//       console.log(`Added: ${this._index}. Could be added? `, this.push(buf));
//     }
//   }
// }

// const counter = new Counter({ highWaterMark: 2 });
// console.log(`Received: ${counter.read().toString()}`);
// counter.on('data', chunk => {
//   console.log(`Received: ${chunk.toString()}`);
// });


// const { Writable } = require('stream');
// class Counter1 extends Writable {
//   _write(chunk, encoding, callback) {
//     console.log(chunk.toString());

//     callback();
//   }
// }

// const counter1 = new Counter1({ highWaterMark: 2 });
// for (let i = 1; i < 1000; i += 1) {
//   counter1.write(Buffer.from(`${i}`, 'utf8'));
// }


