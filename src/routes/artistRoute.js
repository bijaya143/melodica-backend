const { Router } = require("express");
const { adminAuthorize, authorize } = require("../service/authService");
const artistController = require("../controllers/artistController");
const {
  createValidator,
} = require("../common/validations/artist/artistValidator");
const {
  paginationValidator,
} = require("../common/validations/pagination/paginationValidator");
const artistRouter = Router();

artistRouter.post(
  "",
  adminAuthorize,
  createValidator,
  artistController.createArtist
);

artistRouter.patch("/:id", adminAuthorize, artistController.updateArtist);

artistRouter.delete("/:id", adminAuthorize, artistController.deleteArtist);

artistRouter.get("/:id", artistController.getArtistById);

artistRouter.get("", paginationValidator, artistController.getArtists);

artistRouter.patch(
  "/stream-count/:id",
  authorize,
  paginationValidator,
  artistController.increaseArtistStreamCount
);

module.exports = {
  artistRouter,
};
