const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('exercises 4.8 - 4.12', () => {
  describe('GET', () => {
    test('notes are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('correct number of blogs returned with status 200', async () => {
      const response = await api.get('/api/blogs').expect(200);

      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('a specific note is within the returned blogs', async () => {
      const response = await api.get('/api/blogs');

      const contents = response.body.map((r) => r.title);
      expect(contents).toContain('A Less Important Blog');
    });
  });

  describe('POST', () => {
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

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((r) => r.title);
      expect(titles).toContain('May The Fourth Be With You');
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
  });

  describe('other', () => {
    test('the unique identifier received for blog posts is named id', async () => {
      const { body } = await api.get('/api/blogs');
      expect(body[0].id).toBeDefined();
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
  });
});

describe('exercises 4.13 - 4.14', () => {
  describe('DELETE', () => {
    test('delete a valid blog post with status 204', async () => {
      const newBlog = {
        title: 'About Myself',
        author: 'Myself',
        url: 'https://www.aboutmyselfiamjared.com',
        likes: 467,
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      await api.delete(`/api/blogs/${response.body.id}`).expect(204);

      const listAtEnd = await api.get('/api/blogs').expect(200);

      expect(listAtEnd.body.length).toBe(helper.initialBlogs.length);
    });

    test('return status 500 for invalid delete request', async () => {
      const invalidId = '123abc';

      await api.delete(`/api/blogs/${invalidId}`).expect(500);
    });
  });

  describe('PUT', () => {
    test('Update a valid blog with status 204', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const firstBlog = response.body[0];

      firstBlog['author'] = 'Evil Jared';

      await api.put(`/api/blogs/${firstBlog.id}`).send(firstBlog).expect(204);

      const secondResponse = await api.get('/api/blogs');

      const authors = secondResponse.body.map((r) => r.author);

      expect(authors).toContain('Evil Jared');
    });
  });
});

describe('exercises 4.15 - 4.23', () => {
  describe('adding a new user', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();
    });
    test('new user can be added', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'second user',
        name: 'second',
        password: 'password',
      };

      // RETURNS ONLY CREATED USER
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      // RETURNS ALL USERS INCLUDING NEWLY ADDED ONE
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toEqual(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((user) => user.username);
      expect(usernames).toContain(newUser.username);
    });

    expect();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
