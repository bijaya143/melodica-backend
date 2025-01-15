const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { SchemaWithBaseTime, preSaveAddBaseTime } = require("./base");

const collectionName = "artists";

const collectionSchema = new Schema(
  SchemaWithBaseTime({
    displayName: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    streamCount: { type: Number, required: false, default: 0 },
    email: { type: String, required: false },
  })
);

collectionSchema.pre("save", preSaveAddBaseTime);

collectionSchema.plugin(uniqueValidator, { message: "is already taken." });

const collectionModel = model("Artist", collectionSchema, collectionName);

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
