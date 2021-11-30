const { favoriteBlog } = require('../utils/list_helper');

describe('Favorite Blog', () => {
  test('If list is empty, return empty object {}', () => {
    const blogs = [];
    const result = favoriteBlog(blogs);
    expect(result).toEqual({});
  });

  test('If list has single item, return that item', () => {
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
    const result = favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('If list has multiple items, return the item with the most likes', () => {
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
    const result = favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Debts To Be Paid',
      author: 'Jamie Lannister',
      likes: 13,
    });
  });
});
