const { Router } = require("express");
const { adminAuthorize, authorize } = require("../service/authService");
const songController = require("../controllers/songController");
const { createValidator } = require("../common/validations/song/songValidator");
const {
  paginationValidator,
} = require("../common/validations/pagination/paginationValidator");
const songRouter = Router();

songRouter.post("", adminAuthorize, createValidator, songController.createSong);

songRouter.patch("/:id", adminAuthorize, songController.updateSong);

songRouter.delete("/:id", adminAuthorize, songController.deleteSong);

songRouter.get("/:id", authorize, songController.getSongById);

songRouter.get("", authorize, paginationValidator, songController.getSongs);

songRouter.get(
  "/trending/get-all",
  authorize,
  paginationValidator,
  songController.getTrendingSongs
);

songRouter.patch(
  "/play-count/:id",
  authorize,
  songController.increaseSongPlayCount
);

songRouter.get(
  "/popular/get-all/songs",
  authorize,
  paginationValidator,
  songController.getPopularSongs
);

songRouter.get(
  "/recommended/get-all/songs/me",
  authorize,
  paginationValidator,
  songController.getRecommendedSongs
);

songRouter.get(
  "/get-all/songs/artist/:id",
  authorize,
  paginationValidator,
  songController.getSongsByArtist
);

songRouter.get(
  "/get-all/songs/genre/genre-name/:id",
  authorize,
  paginationValidator,
  songController.getSongsByGenre
);

module.exports = {
  songRouter,
};
