const validator = require("express-joi-validation").createValidator({});
const { loginSchema, createSchema, updateSchema } = require("./auth");

const createValidator = validator.body(createSchema);
const updateValidator = validator.body(updateSchema);
const loginValidator = validator.body(loginSchema);

module.exports = {
  createValidator,
  updateValidator,
  loginValidator,
};
