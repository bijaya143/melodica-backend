const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { SchemaWithBaseTime, preSaveAddBaseTime } = require("./base");
const { songCollectionSchema } = require("./song");

const collectionName = "user_playlists";

const collectionSchema = new Schema(
  SchemaWithBaseTime({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    songs: { type: [songCollectionSchema], required: false, default: [] },
  })
);

collectionSchema.pre("save", preSaveAddBaseTime);

collectionSchema.plugin(uniqueValidator, { message: "is already taken." });

const collectionModel = model("UserPlaylist", collectionSchema, collectionName);

async function fetch(params = {}, paginationParams = {}) {
  return collectionModel
    .find(params, {}, paginationParams)
    .sort({ createdAt: -1 });
}

async function fetchById(id) {
  return collectionModel.findOne({ _id: id });
}

async function create(params) {
  try {
    return collectionModel.create(params);
  } catch (err) {
    throw err;
  }
}

async function update(id, params) {
  const updatedAt = new Date();
  try {
    return collectionModel.updateOne({ _id: id }, { ...params, updatedAt });
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return collectionModel.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetch,
  fetchById,
  create,
  update,
  remove,
};
