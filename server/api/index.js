const chalk = require('chalk');
const { Router } = require('express');
const usersRouter = require('./users');

const apiRouter = Router();

apiRouter.use((req, res, next) => {
  console.log(chalk.yellow(`API Router received request!`), req.path);

  next();
});

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
