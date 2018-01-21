const value = Array.from({length: 256})
.map((_, i) => i)
.map(x => x === 0 ? 0 : x === 127 ? Infinity : x === 128 ? NaN : x === 255 ? -Infinity :
    (x & 128 ? -1 : 1) * 2 ** (((x & 127) >> 2) - 16) * [1,1.25,1.5,1.75][x & 3]);
const neg = new DataView(new ArrayBuffer(256));
const add = new DataView(new ArrayBuffer(65536));

// initialize negation
Array.from({length: 256})
.map((_, i) => i)
.forEach(i => neg.setUint8(i, i === 0 ? 0 : i === 128 ? NaN : (i + 128) & 255));

module.exports = {
    valueOf: index => value[index],
    negate: index => neg.getUint8(index),
    add: (x, y) => add.getUint8(x << 8 | y),
    subtract: (x, y) => add.getUint8(x << 8 | neg.getUint8(y)),
    multiply: (x, y) => 0,
    divide: (x, y) => 0,
};
