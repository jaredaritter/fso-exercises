const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  }
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!(body.username && body.password)) {
    res.status(400).json({ error: 'username and password required' });
  }

  if (body.username.length < 3 || body.password.length < 3) {
    res
      .status(400)
      .json({ error: 'username and password must be at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;
