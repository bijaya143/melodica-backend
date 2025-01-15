const { fetchById } = require("../model/song");
const { fetch, create, update } = require("../model/userPlaylist");

async function storeUserPlaylist(userId, playlistName) {
  await validateUserPlaylistName(userId, playlistName);
  try {
    return await create({ userId, name: playlistName });
  } catch (error) {
    return error;
  }
}

async function validateUserPlaylistName(userId, playlistName) {
  const [playlist] = await fetch({
    userId: userId,
    name: playlistName,
  });
  if (playlist) throw new Error("Playlist Name already exists.");
}

async function validateUserPlaylist(userId, playlistId) {
  const [playlist] = await fetch({
    userId: userId,
    _id: playlistId,
  });
  if (!playlist) throw new Error(`Playlist doesn't belong to the user`);
  return playlist;
}

async function storeSongToUserPlaylist(userId, playlistId, songId) {
  const song = await fetchById(songId);
  if (!song) throw new Error(`Song does not exist.`);
  const playlist = await validateUserPlaylist(userId, playlistId);
  await validateSongInUserPlaylist(userId, playlistId, songId);
  const songs = [song, ...playlist.songs];
  try {
    return await update(playlist._id, { songs });
  } catch (error) {
    return error;
  }
}

async function validateSongInUserPlaylist(userId, playlistId, songId) {
  const [playlist] = await fetch({
    userId: userId,
    _id: playlistId,
    "songs._id": songId,
  });
  if (playlist) throw new Error(`Song has already been added.`);
}

module.exports = {
  storeUserPlaylist,
  storeSongToUserPlaylist,
  validateUserPlaylist,
};
