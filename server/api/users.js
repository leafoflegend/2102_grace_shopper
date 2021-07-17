const chalk = require('chalk');
const { Router } = require('express');
const {
  getAllUsers,
  signupUser,
  getUserByEmailAndPassword,
} = require('../db/index');
const { createJWT } = require('./user_utils');

const SALT = process.env.SALT || 10;

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const { email: signedUpEmail, id } = await signupUser(email, password);

  res.send({
    message: 'User created successfully!',
    user: {
      id,
      email: signedUpEmail,
    },
  });
});

usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmailAndPassword(email, password);

  if (!user) {
    res.status(401).send({
      message: 'User not found.',
    });
  } else {
    const token = createJWT(user.email, user.id);

    res.send({
      message: 'Login Successful!',
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  }
});

usersRouter.get('/whoami', (req, res) => {
  if (req.user) {
    res.send({
      user: req.user,
    });
  } else {
    res.status(401).send({
      message: 'You are not a signed in or authenticated user.',
    });
  }
});

module.exports = usersRouter;
