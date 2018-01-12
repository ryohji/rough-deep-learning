const assert = require('assert');

describe('Floating point number', () => {
    it('minimum is 5e-324.', () => {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setUint8(7, 1);
        assert.equal(5e-324, view.getFloat64(0));
    });
});
