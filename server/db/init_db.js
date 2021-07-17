const chalk = require('chalk');
const db = require('./db');

const initDB = async () => {
  try {
    await db.connect();

    await db.query(`
      DROP TABLE IF EXISTS users;

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await db.end();
  } catch (e) {
    console.log(chalk.redBright(`Failed to INIT DB!`));
    console.error(e);
  }
}

initDB();
