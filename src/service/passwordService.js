const bcryptjs = require("bcryptjs");

const SALT_ROUND = 10;

function hash(password) {
  return bcryptjs.hash(password, SALT_ROUND);
}

function compare(password, hashedPassword) {
  return bcryptjs.compare(password, hashedPassword);
}

module.exports = {
  hash,
  compare,
};
