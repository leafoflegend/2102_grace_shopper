const chalk = require('chalk');
const db = require('./db');
const {
  getUserByEmailAndPassword,
  getAllUsers,
  signupUser,
} = require('./users');

const initializeDB = async () => {
  console.log(chalk.cyan(`Initializing DB connection...`));

  await db.connect();

  console.log(chalk.green(`DB connected!`));
};

module.exports = {
  db,
  getAllUsers,
  getUserByEmailAndPassword,
  signupUser,
  initializeDB,
};
