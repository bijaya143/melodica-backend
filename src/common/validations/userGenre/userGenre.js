const Joi = require("joi");

const createSchema = Joi.object({
  genres: Joi.array().items(Joi.string()).min(3).required(),
});

module.exports = {
  createSchema,
};
