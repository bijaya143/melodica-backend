const { Router } = require("express");

const {
  createValidator,
  updateValidator,
  addSongValidator,
} = require("../common/validations/userPlaylist/userPlaylistValidator");
const userPlaylistController = require("../controllers/userPlaylistController");
const { authorize } = require("../service/authService");
const {
  paginationValidator,
} = require("../common/validations/pagination/paginationValidator");

const userPlaylistRouter = Router();

userPlaylistRouter.post(
  "",
  authorize,
  createValidator,
  userPlaylistController.createUserPlaylist
);

userPlaylistRouter.patch(
  "/:playlistId",
  authorize,
  updateValidator,
  userPlaylistController.updateUserPlaylist
);

userPlaylistRouter.patch(
  "/:playlistId/song/:songId",
  authorize,
  addSongValidator,
  userPlaylistController.addSongToUserPlaylist
);

userPlaylistRouter.get(
  "",
  authorize,
  paginationValidator,
  userPlaylistController.getUserPlaylists
);

userPlaylistRouter.get(
  "/:playlistId",
  authorize,
  userPlaylistController.getUserPlaylistById
);

userPlaylistRouter.delete(
  "/:playlistId",
  authorize,
  userPlaylistController.deleteUserPlaylist
);
module.exports = {
  userPlaylistRouter,
};
