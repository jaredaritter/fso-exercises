const { dummy } = require('../utils/list_helper');

describe('Dummy tests', () => {
  test('Dummy test 1 returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });

  test('Dummy test 2 returns one', () => {
    const blogs = [1, 2, 3, 4, 5];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});
