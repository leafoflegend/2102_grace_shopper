const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'not_so_secret';

const createJWT = (email, id) => {
  const token = jwt.sign({
    email,
    id,
  }, JWT_SECRET);

  return token;
};

const verifyJWT = (token) => {
  const decodedToken = jwt.verify(token, JWT_SECRET);

  if (!decodedToken) {
    return null;
  }

  return decodedToken;
};

module.exports = {
  createJWT,
  verifyJWT,
};
