const Joi = require("joi");

const createSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  createSchema,
};
