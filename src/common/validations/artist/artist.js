const Joi = require("joi");

const createSchema = Joi.object({
  displayName: Joi.string().required(),
  email: Joi.string(),
});

const updateSchema = Joi.object({
  displayName: Joi.string(),
  email: Joi.string(),
});

module.exports = {
  createSchema,
  updateSchema,
};
