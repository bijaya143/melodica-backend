const { Router } = require("express");

const { authRouter } = require("./authRoute");
const { artistRouter } = require("./artistRoute");
const { uploadRouter } = require("./uploadRoute");
const { genreRouter } = require("./genreRoute");
const { userGenreRouter } = require("./userGenreRoute");
const { userRouter } = require("./userRoute");
const { songRouter } = require("./songRoute");
const { userFavoriteRouter } = require("./userFavoriteRoute");
const { userPlaylistRouter } = require("./userPlaylistRoute");

const router = Router();

router.use("/auth", authRouter);
router.use("/artist", artistRouter);
router.use("/", uploadRouter);
router.use("/genre", genreRouter);
router.use("/user-genre", userGenreRouter);
router.use("/user", userRouter);
router.use("/song", songRouter);
router.use("/user/favorite", userFavoriteRouter);
router.use("/user/playlist", userPlaylistRouter);

module.exports = {
  router,
};
