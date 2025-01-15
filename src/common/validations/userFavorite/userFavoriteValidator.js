const validator = require("express-joi-validation").createValidator({});
const { createSchema } = require("./userFavorite");

const createValidator = validator.body(createSchema);

module.exports = {
  createValidator,
};
