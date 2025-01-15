const validator = require("express-joi-validation").createValidator({});
const { updateSchema } = require("./user");

const updateValidator = validator.body(updateSchema);

module.exports = {
  updateValidator,
};
