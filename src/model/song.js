const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { SchemaWithBaseTime, preSaveAddBaseTime } = require("./base");

const collectionName = "songs";

const songCollectionSchema = new Schema(
  SchemaWithBaseTime({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    imageUrl: { type: String, required: true },
    audioUrl: { type: String, required: true },
    favoriteCount: { type: Number, default: 0 },
    playCount: { type: Number, default: 0 },
  })
);

songCollectionSchema.pre("save", preSaveAddBaseTime);

songCollectionSchema.plugin(uniqueValidator, { message: "is already taken." });

const collectionModel = model("Song", songCollectionSchema, collectionName);

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

async function fetchTrendingSongs(params = {}, paginationParams = {}) {
  return collectionModel
    .find(params, {}, paginationParams)
    .sort({ playCount: -1 });
}

async function fetchPopularSongs(params = {}, paginationParams = {}) {
  return collectionModel
    .find(params, {}, paginationParams)
    .sort({ favoriteCount: -1 });
}

module.exports = {
  fetch,
  fetchById,
  create,
  update,
  remove,
  songCollectionSchema,
  fetchTrendingSongs,
  fetchPopularSongs,
};
