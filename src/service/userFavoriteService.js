const { fetchById, update } = require("../model/song");
const { create, fetch } = require("../model/userFavorite");

async function storeUserFavorite(userId, songId) {
  const song = await fetchById(songId);
  if (!song) throw new Error("Song does not exist.");
  const duplicate = await validateUserFavorite(userId, songId);
  if (duplicate) return duplicate;
  try {
    const userFavoriteSong = await create({ userId, song });
    update(songId, { favoriteCount: song.favoriteCount + 1 });
    return userFavoriteSong;
  } catch (error) {
    return error;
  }
}

async function validateUserFavorite(userId, songId) {
  const userFavorite = await fetch({ "song._id": songId, userId: userId });
  if (userFavorite && userFavorite.length && userFavorite.length >= 1) {
    return userFavorite[0];
  }
  return false;
}
module.exports = {
  storeUserFavorite,
  validateUserFavorite,
};
