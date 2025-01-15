const Joi = require("joi");

const updateSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  dob: Joi.string(),
  gender: Joi.string().valid("male", "female", "other"),
  oldPassword: Joi.string(),
  newPassword: Joi.string(),
  image: Joi.object(),
});

module.exports = {
  updateSchema,
};
