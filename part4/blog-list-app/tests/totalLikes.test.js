const { totalLikes } = require('../utils/list_helper');

describe('Total Likes', () => {
  test('Empty list returns 0', () => {
    const blogs = [];
    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('List with single item returns number of likes of that item', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(5);
  });

  test('List with multiple items returns summed likes of all items', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f3',
        title: 'Winter Is Coming',
        author: 'Eddard Stark',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Winter_Is_Coming.html',
        likes: 1,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Debts To Be Paid',
        author: 'Jamie Lannister',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Debts_To_Be_Paid.html',
        likes: 13,
        __v: 0,
      },
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(19);
  });
});
