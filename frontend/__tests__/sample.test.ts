/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);

  return aNum + bNum;
}

// @ts-ignore
describe('Same test 101', () => {
  it('works as expected', () => {
    // we ran our expect statements to see if the test will pass
    expect(1).toEqual(1);
    // expect(2).toEqual('2');

    const age = 100;
    expect(age).toEqual(100);
  });

  it('adds two things together', () => {
    // we run our expect statements to see if the test will pass
    expect(1 + 1).toEqual(2);
  });

  it('runs the add function properly', () => {
    expect(add(1, 2)).toBeGreaterThanOrEqual(3);
  });

  it('can add strings of numbers together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
