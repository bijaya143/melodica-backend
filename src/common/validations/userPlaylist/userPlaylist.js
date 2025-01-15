const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
});

const addSongSchema = Joi.object({
  playlistId: Joi.string().required(),
  songId: Joi.string().required(),
});

module.exports = {
  createSchema,
  updateSchema,
  addSongSchema,
};
