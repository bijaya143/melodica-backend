const { fetch, update, remove } = require("../model/userPlaylist");
const {
  storeUserPlaylist,
  storeSongToUserPlaylist,
  validateUserPlaylist,
} = require("../service/userPlaylistService");

const createUserPlaylist = async (req, res, next) => {
  const { name } = req.body;
  try {
    await storeUserPlaylist(req.userId, name);
    return res.status(201).json({
      success: true,
      data: {
        message: "Playlist has been created.",
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const addSongToUserPlaylist = async (req, res, next) => {
  const { playlistId, songId } = req.params;
  try {
    await storeSongToUserPlaylist(req.userId, playlistId, songId);
    return res.status(201).json({
      success: true,
      data: {
        message: "Song has been added to the playlist.",
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const getUserPlaylists = async (req, res, next) => {
  const { limit, page } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };

  try {
    const userPlaylists = await fetch({ userId: req.userId }, paginationParams);
    return res.json({
      success: true,
      data: {
        userPlaylists,
        message: "Playlists have been fetched.",
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const getUserPlaylistById = async (req, res, next) => {
  try {
    const playlist = await validateUserPlaylist(
      req.userId,
      req.params.playlistId
    );
    return res.json({
      success: true,
      data: { playlist, message: "Playlist has been fetched." },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const updateUserPlaylist = async (req, res, next) => {
  const { name } = req.body;
  try {
    await validateUserPlaylist(req.userId, req.params.playlistId);
    await update(req.params.playlistId, { name: name });
    return res.json({
      success: true,
      data: {
        message: "Playlist have been updated.",
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const deleteUserPlaylist = async (req, res) => {
  try {
    await validateUserPlaylist(req.userId, req.params.playlistId);
    await remove(req.params.playlistId);
    return res.json({
      success: true,
      data: {
        message: "Playlist have been deleted.",
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  createUserPlaylist,
  addSongToUserPlaylist,
  getUserPlaylists,
  getUserPlaylistById,
  updateUserPlaylist,
  deleteUserPlaylist,
};
