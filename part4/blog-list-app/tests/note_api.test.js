const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

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
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test('notes are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct number of blogs returned with status 200', async () => {
  const response = await api.get('/api/blogs').expect(200);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain('A Less Important Blog');
});

test('the unique identifier received for blog posts is named id', async () => {
  const { body } = await api.get('/api/blogs');
  expect(body[0].id).toBeDefined();
});

test('a valid blog can be added with status 201', async () => {
  const newBlog = {
    title: 'May The Fourth Be With You',
    author: 'Some Nerd',
    url: 'https://www.itsthefourthofmay.com/',
    likes: 13,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');

  expect(body).toHaveLength(initialBlogs.length + 1);

  const titles = body.map((r) => r.title);
  expect(titles).toContain('May The Fourth Be With You');
});

test('the "like" property is created and set to 0 if not included', async () => {
  const newBlog = {
    title: 'Fifth Times The Charm',
    author: 'Russel Crowe',
    url: 'https://www.fivecrowesleftofthemurder.com/',
  };

  const { body } = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(body.likes).toBe(0);
});

test('receive 400 bad request if POST does not contain title or url properties', async () => {
  const newBlog1 = {
    author: 'Steven Segal',
    url: 'https://www.stillnotsixy.com',
    likes: 3,
  };

  const newBlog2 = {
    title: 'Jane Fondas Workout',
    author: 'Jane Fonda',
    likes: 3,
  };

  const newBlog3 = {
    author: 'Lonely Author',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/blogs')
    .send(newBlog3)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

describe('deleting blogs', () => {
  test('deletes a the first blog', () => {
    const { body } = await api.get('/api/blogs');

    const firstBlog = body[0];
    console.log(firstBlog);

    // UNSURE WHAT SYNTAX TO USE. SEEMS THAT I NEED TO USE POST FROM A QUICK LOOK AT THE DOCS. WILL START WITH THE ROUTE.

    const returnedBlog = Blog.findByIdAndDelete(firstBlog.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
