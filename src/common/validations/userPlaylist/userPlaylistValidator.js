const validator = require("express-joi-validation").createValidator({});
const { createSchema, updateSchema, addSongSchema } = require("./userPlaylist");

const createValidator = validator.body(createSchema);
const updateValidator = validator.body(updateSchema);
const addSongValidator = validator.params(addSongSchema);

module.exports = {
  createValidator,
  updateValidator,
  addSongValidator,
};
