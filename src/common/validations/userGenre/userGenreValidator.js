const validator = require("express-joi-validation").createValidator({});
const { createSchema } = require("./userGenre");

const createValidator = validator.body(createSchema);

module.exports = {
  createValidator,
};
