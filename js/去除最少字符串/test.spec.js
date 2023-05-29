const { removeMiniumStr } = require('./util');

const str1 = 'ababac';

const str2 = 'aaabbbcceeff';

const str3 = 'abcdefg';

const str4 = 'aabbccddee';

const str5 = 'aabbcccddee';

describe('test-remove-minimum-str', () => {
  test('str1', () => {
    expect(removeMiniumStr(str1)).toBe('ababa');
  });
  test('str2', () => {
    expect(removeMiniumStr(str2)).toBe('aaabbb');
  });
  test('str3', () => {
    expect(removeMiniumStr(str3)).toBe('abcdefg');
  });
  test('str4', () => {
    expect(removeMiniumStr(str4)).toBe('aabbccddee');
  });
  test('str5', () => {
    expect(removeMiniumStr(str5)).toBe('ccc');
  });
});
