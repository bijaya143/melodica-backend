const Joi = require("joi");

const paramSchema = Joi.object({
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
  keyword: Joi.string(),
});

module.exports = {
  paramSchema,
};
