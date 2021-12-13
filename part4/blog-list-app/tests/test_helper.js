const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'A Less Important Blog',
    author: 'Jared Ritter',
    url: 'https://www.jaredaritter.com/',
    likes: 50,
  },
  {
    title: 'The Second Course',
    author: 'Suzie',
    url: 'https://www.thesecondcourse.com/',
    likes: 128,
  },
  {
    title: 'A Third Blog',
    author: 'Penny Boxman',
    url: 'https://www.pennythedogblog.com/',
    likes: 53,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
