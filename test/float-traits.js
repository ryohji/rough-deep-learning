const assert = require('assert');

describe('Floating point number', () => {
    const UINT32_MAX = 4294967295;

    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    beforeEach(() => view.setFloat64(0, 0));

    it('Minimum is 5e-324.', () => {
        view.setUint8(7, 1);
        assert.equal(5e-324, view.getFloat64(0));
    });
    it('Math.pow(2, 1024) is overflown.', () => assert.equal(Math.pow(2, 1024), Infinity));
    it('5e-324 multiplied by 2^1074 becomes 1.', () => assert.equal(5e-324 * Math.pow(2, 1023) * Math.pow(2, 51), 1));
    it('5e-324 equals 2^-1074.', () => assert.equal(Math.log2(5e-324), -1074));
    it('First 12 true bits makes negative infinity.', () => {
        view.setUint16(0, parseInt('fff0', 16));
        assert.equal(view.getFloat64(0), -Infinity);
    });
    it('False and trailing 11 true bits makes positive infinity.', () => {
        view.setUint16(0, parseInt('0x7ff0', 16));
        assert.equal(view.getFloat64(0), Infinity);
    });
    it('NaN\'s bit pattern is 7ff8-0000-0000-0000.', () => {
        view.setFloat64(0, NaN);
        assert.equal(view.getUint32(0), parseInt('7ff80000', 16));
        assert.equal(view.getUint32(4), parseInt('00000000', 16));
    });
    it('bit pattern ffff-ffff-ffff-ffff also interpreted as NaN.', () => {
        assert.equal(UINT32_MAX, parseInt('ffffffff', 16));
        view.setUint32(0, UINT32_MAX);
        view.setUint32(4, UINT32_MAX);
        assert.equal(Number.isNaN(view.getFloat64(0)), true);
    });
    it('1\'s exponent is 0.', () => assert.equal(Math.log2(1), 0));
    it('1\'s bit pattern is 3ff0-0000-0000-0000.', () => {
        view.setFloat64(0, 1);
        assert.equal(view.getUint32(0).toString(16), '3ff00000');
        assert.equal(view.getUint32(4).toString(16), '0');
    });
    it('0x03ff is 1023.', () => assert.equal(parseInt('03ff', 16), 1023));
    it('Normalized minimum is 2^-1022.', () => {
        view.setUint16(0, 1 << 4);
        assert.equal(view.getFloat64(0), 2 ** -1022);
    });
    it('Maximum exponent is 1023 (2 ** 1023).', () => assert.equal(2 ** (parseInt('7fe', 16) - 1023), 2 ** 1023));
    it('000f-ffff-ffff-ffff is Number (NOT NaN).', () => {
        view.setUint32(0, parseInt('000fffff', 16));
        view.setUint32(4, UINT32_MAX);
        assert.equal(Number.isNaN(view.getFloat64(0)), false);
    });
    it('000f-ffff-ffff-ffff + 5e-324 becomes 2^-1022.', () => {
        view.setUint32(0, parseInt('000fffff', 16));
        view.setUint32(4, UINT32_MAX);
        assert.equal(view.getFloat64(0) + 5e-324, 2 ** -1022);
    });
    it('2^-1022 - 000f-ffff-ffff-ffff makes 5e-324.', () => {
        view.setUint32(0, parseInt('000fffff', 16));
        view.setUint32(4, UINT32_MAX);
        assert.equal(2 ** -1022 - view.getFloat64(0), 5e-324);
    });
    it('0008-0000-0000-0000 is 2^-1023 (sub-normal).', () => {
        view.setFloat64(0, 2 ** -1023);
        assert.equal(view.getUint32(0), parseInt('00080000', 16));
        assert.equal(view.getUint32(4), parseInt('00000000', 16));
    });
    it('3ff1-0000-0000-0000 is 1.0625.', () => {
        view.setUint16(0, parseInt('3ff1', 16));
        assert.equal(view.getFloat64(0), 1.0625);
    });
    it('3ff2-0000-0000-0000 is 1.125.', () => {
        view.setUint16(0, parseInt('3ff2', 16));
        assert.equal(view.getFloat64(0), 1.125);
    });
    it('3ff4-0000-0000-0000 is 1.25.', () => {
        view.setUint16(0, parseInt('3ff4', 16));
        assert.equal(view.getFloat64(0), 1.25);
    });
    it('3ff7-0000-0000-0000 is 1.4375.', () => {
        view.setUint16(0, parseInt('3ff7', 16));
        assert.equal(view.getFloat64(0), 1.4375); // 1 + .0625 + .125 + .25
    });
    it('3ff8-0000-0000-0000 is 1.5.', () => {
        view.setUint16(0, parseInt('3ff8', 16));
        assert.equal(view.getFloat64(0), 1.5);
    });
    it('3ffc-0000-0000-0000 is 1.75.', () => {
        view.setUint16(0, parseInt('3ffc', 16));
        assert.equal(view.getFloat64(0), 1.75);
    });
    it('3ff4-0000-0000-0000 is 1.9375.', () => {
        view.setUint16(0, parseInt('3fff', 16));
        assert.equal(view.getFloat64(0), 1.9375); // 1 + .0625 + .125 + .25 + .5
    });
});
