const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = blogs.reduce((a, c) => a + c.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let favoriteIndex = 0;
  let last = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes >= last) {
      favoriteIndex = i;
    }
    last = blogs[i].likes;
  }
  const { title, author, likes } = blogs[favoriteIndex];
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    };
  } else {
    const authorCount = _.countBy(blogs, 'author');
    let maxAuthor = '';
    let maxBlogs = 0;
    for (let value in authorCount) {
      if (authorCount[value] > maxBlogs) {
        maxAuthor = value;
        maxBlogs = authorCount[value];
      }
    }
    return {
      author: maxAuthor,
      blogs: maxBlogs,
    };
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  } else {
    let obj = {};
    blogs.forEach((blog) => {
      if (blog.author in obj) {
        // add to current total
        obj[blog.author] += blog.likes;
      } else {
        obj[blog.author] = blog.likes;
      }
    });
    console.log(obj);
    let maxAuthor = '';
    let maxLikes = 0;
    for (let value in obj) {
      if (obj[value] > maxLikes) {
        maxAuthor = value;
        maxLikes = obj[value];
      }
    }
    return {
      author: maxAuthor,
      likes: maxLikes,
    };
  }
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
