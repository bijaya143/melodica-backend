const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { SchemaWithBaseTime, preSaveAddBaseTime } = require("./base");

const collectionName = "users";

const collectionSchema = new Schema(
  SchemaWithBaseTime({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "customer" },
    genres: { type: [{ id: String, name: String }], required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dob: { type: String, required: false },
    gender: { type: String, required: false },
    imageUrl: { type: String, required: false },
  })
);

collectionSchema.pre("save", preSaveAddBaseTime);

collectionSchema.plugin(uniqueValidator, { message: "is already taken." });

const collectionModel = model("User", collectionSchema, collectionName);

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
