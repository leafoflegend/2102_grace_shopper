const { Client } = require('pg');

const db = new Client('postgres://localhost:5432/2102_grace_shopper');

module.exports = db;
