const { Router } = require("express");
const { adminAuthorize } = require("../service/authService");
const genreController = require("../controllers/genreController");
const {
  updateValidator,
  createValidator,
} = require("../common/validations/genre/genreValidator");
const {
  paginationValidator,
} = require("../common/validations/pagination/paginationValidator");
const genreRouter = Router();

genreRouter.post(
  "",
  adminAuthorize,
  createValidator,
  genreController.createGenre
);

genreRouter.patch(
  "/:id",
  adminAuthorize,
  updateValidator,
  genreController.updateGenre
);

genreRouter.delete("/:id", adminAuthorize, genreController.deleteGenre);

genreRouter.get("/:id", genreController.getGenreById);

genreRouter.get("", paginationValidator, genreController.getGenres);

module.exports = {
  genreRouter,
};
