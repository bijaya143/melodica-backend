const { Router } = require("express");

const {
  createValidator,
} = require("../common/validations/userGenre/userGenreValidator");
const userGenreController = require("../controllers/userGenreController");
const { authorize } = require("../service/authService");

const userGenreRouter = Router();

userGenreRouter.post(
  "",
  authorize,
  createValidator,
  userGenreController.create
);

module.exports = {
  userGenreRouter,
};
