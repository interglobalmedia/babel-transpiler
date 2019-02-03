const sum = require('./sum');

describe('sum', () => {
    it('should add 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    })
})