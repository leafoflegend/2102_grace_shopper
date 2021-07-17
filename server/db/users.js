const bcrypt = require('bcrypt');
const db = require('./db');

const SALT = process.env.SALT || 10;

const getAllUsers = async () => {
  const { rows } = await db.query(`
    SELECT email FROM users;
  `);

  return rows;
};

const getUserByEmailAndPassword = async (email, password) => {
  const { rows } = await db.query(`
    SELECT * FROM users WHERE email=$1;
  `, [email]);

  const user = rows[0];

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
};

const signupUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, SALT);

  const { rows } = await db.query(`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING email, id;
  `, [email, hashedPassword]);

  return rows[0];
};

module.exports = {
  getAllUsers,
  getUserByEmailAndPassword,
  signupUser,
};
