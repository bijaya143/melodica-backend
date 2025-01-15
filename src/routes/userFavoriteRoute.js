const { Router } = require("express");

const {
  createValidator,
} = require("../common/validations/userFavorite/userFavoriteValidator");
const userFavoriteController = require("../controllers/userFavoriteController");
const { authorize } = require("../service/authService");
const {
  paginationValidator,
} = require("../common/validations/pagination/paginationValidator");

const userFavoriteRouter = Router();

userFavoriteRouter.post(
  "",
  authorize,
  createValidator,
  userFavoriteController.createUserFavorite
);

userFavoriteRouter.delete(
  "/:songId",
  authorize,
  userFavoriteController.removeUserFavorite
);
userFavoriteRouter.get(
  "",
  authorize,
  paginationValidator,
  userFavoriteController.getUserFavorites
);

userFavoriteRouter.get(
  "/:songId",
  authorize,
  userFavoriteController.getUserFavorite
);
module.exports = {
  userFavoriteRouter,
};
