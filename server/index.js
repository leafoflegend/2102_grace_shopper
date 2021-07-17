const express = require('express');
const chalk = require('chalk');
const { initializeDB } = require('./db/index');
const apiRouter = require('./api/index');
const { verifyJWT } = require('./api/user_utils');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const authMiddleware = (req, res, next) => {
  let authHeader = req.headers.authorization;

  console.log('Headers: ', req.headers);

  if (authHeader) {
    authHeader = authHeader.slice(7);
    try {
      const decodedToken = verifyJWT(authHeader);

      req.user = decodedToken;
    } catch (e) {
      console.log(chalk.red(`Invalid JWT provided in header. Someone may be trying to hack our site, or just be an idiot.`));
    }
  }

  next();
};

app.use(authMiddleware);

app.use('/api', apiRouter);

const startServer = async () => {
  console.log(chalk.cyan(`Server is starting up...`));

  await initializeDB();

  app.listen(PORT, () => {
    console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
  });
};

startServer();

