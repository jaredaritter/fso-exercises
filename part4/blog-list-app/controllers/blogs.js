const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// CAN USE ERROR HANDLING PACKAGE TO ELIMINATE TRY/CATCH BLOCKS

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  if (!blog.title || !blog.url) {
    res.status(400).json({ error: 'missing required field' });
  }
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const response = await Blog.findByIdAndDelete(req.params.id);
  if (response) {
    res.status(204).end();
  }
});

module.exports = blogsRouter;
