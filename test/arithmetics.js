const assert = require('assert');

const a = require('../arithmetic/arithmetic');

describe('Arithmetic', () => {
    it('undefined', () => assert.strictEqual(a.scalar(128), undefined));
    it('#127 is Infinity.', () => assert.equal(a.scalar(127), Infinity));
    it('#72 is 4.', () => assert.equal(a.scalar(72), 4));
    it('#68 is 2.', () => assert.equal(a.scalar(68), 2));
    it('#67 is 1.75.', () => assert.equal(a.scalar(67), 1.75));
    it('#66 is 1.5.', () => assert.equal(a.scalar(66), 1.5));
    it('#65 is 1.25.', () => assert.equal(a.scalar(65), 1.25));
    it('#64 is 1.', () => assert.equal(a.scalar(64), 1));
    it('#60 is 0.5.', () => assert.equal(a.scalar(60), 0.5));
    it('#56 is 0.25.', () => assert.equal(a.scalar(56), 0.25));
    it('#0 represents 0.', () => assert.equal(a.scalar(0), 0));
    it('#-64 is -1.', () => assert.equal(a.scalar(-64), -1));
    it('#-127 is negative Infinity.', () => assert.equal(a.scalar(-127), -Infinity));
    it('#-128 represents NaN.', () => assert.equal(Number.isNaN(a.scalar(-128)), true));
    it('undefined (2)', () => assert.strictEqual(a.scalar(-129), undefined));
});
