const { paramSchema } = require("./pagination");

const validator = require("express-joi-validation").createValidator({});

const paginationValidator = validator.query(paramSchema);

module.exports = {
  paginationValidator,
};
