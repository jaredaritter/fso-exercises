const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// CAN USE ERROR HANDLING PACKAGE TO ELIMINATE TRY/CATCH BLOCKS

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);
  if (!blog.title || !blog.url) {
    res.status(400).json({ error: 'missing required field' });
  }
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogsRouter;
