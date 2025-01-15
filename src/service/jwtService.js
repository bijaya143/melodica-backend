const jwt = require("jsonwebtoken");

const config = require("../config");

async function sign(params, expire) {
  let tokenExpiry = 86400; // 1 day
  if (!expire) tokenExpiry = 604800; // 7 day

  return jwt.sign(params, config.JWT_KEY, { expiresIn: tokenExpiry });
}

async function verify(token) {
  return jwt.verify(token, config.JWT_KEY);
}

module.exports = {
  sign,
  verify,
};
