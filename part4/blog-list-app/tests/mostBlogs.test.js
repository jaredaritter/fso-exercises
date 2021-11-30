const { mostBlogs } = require('../utils/list_helper');

describe('Most Blogs', () => {
  test('An empty list returns an empty object {}', () => {
    const blogs = [];
    const result = mostBlogs(blogs);
    expect(result).toEqual({});
  });

  test('A list with a single entry returns the author of the entry and blogs of one', () => {
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
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('A list with multiple entries returns the author with the largest number of blog posts and that number', () => {
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
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful_2.html',
        likes: 7,
        __v: 0,
      },
    ];
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    });
  });
});
