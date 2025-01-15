const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { SchemaWithBaseTime, preSaveAddBaseTime } = require("./base");

const collectionName = "user_genres";

const collectionSchema = new Schema(
  SchemaWithBaseTime({
    userId: { type: String, required: true },
    genres: { type: [String], required: true },
  })
);

collectionSchema.pre("save", preSaveAddBaseTime);

collectionSchema.plugin(uniqueValidator, { message: "is already taken." });

const collectionModel = model("UserGenre", collectionSchema, collectionName);

async function fetch(params = {}) {
  return collectionModel.find(params);
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
