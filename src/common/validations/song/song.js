const Joi = require("joi");

const createSchema = Joi.object({
  title: Joi.string().required(),
  artistId: Joi.string().required(),
  genre: Joi.string().required(),
  image: Joi.object(),
  audio: Joi.object(),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  artistId: Joi.string(),
  genre: Joi.string(),
  image: Joi.object(),
  audio: Joi.object(),
});

module.exports = {
  createSchema,
  updateSchema,
};
