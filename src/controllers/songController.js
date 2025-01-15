const {
  fetchById,
  fetch,
  remove,
  update,
  fetchTrendingSongs,
  fetchPopularSongs,
} = require("../model/song");
const { storeSong, editSong } = require("../service/songService");
const { uploadFileToLocal } = require("../service/uploadService");
const userModel = require("../model/user");
const filePrefix = "songs";

const createSong = async (req, res, next) => {
  // File Validation
  if (req.files) {
    if (!req.files?.["image"]) {
      return res.status(400).json({
        success: false,
        data: { message: "Image is required." },
      });
    }
    if (!req.files?.["audio"]) {
      return res.status(400).json({
        success: false,
        data: { message: "Audio is required." },
      });
    }
  }
  const { title, artistId, genre } = req.body;
  try {
    // Image record
    const imagePath = await uploadFileToLocal(req.files.image, filePrefix);
    const imageKey = `/api/${imagePath}`;
    const audioPath = await uploadFileToLocal(req.files.audio, filePrefix);
    const audioKey = `/api/${audioPath}`;
    const song = await storeSong(title, artistId, genre, imageKey, audioKey);
    return res.json({
      success: true,
      data: { song, message: "Song has been created." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};
const updateSong = async (req, res, next) => {
  const song = await fetchById(req.params.id);
  if (!song) {
    return res.json({
      success: false,
      data: { message: "Song does not exist." },
    });
  }
  let imageUrl = song.imageUrl;
  let audioUrl = song.audioUrl;
  // File Validation
  if (req.files) {
    if (req.files?.["image"]) {
      // Image record
      const imagePath = await uploadFileToLocal(req.files.image, filePrefix);
      imageUrl = `/api/${imagePath}`;
    }
    if (req.files?.["audio"]) {
      const audioPath = await uploadFileToLocal(req.files.audio, filePrefix);
      audioUrl = `/api/${audioPath}`;
    }
  }
  const { title, artistId, genre } = req.body;
  try {
    const updatedSong = await editSong(
      song,
      title,
      artistId,
      genre,
      imageUrl,
      audioUrl
    );
    return res.json({
      success: true,
      data: { updatedSong, message: "Song has been updated." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getSongs = async (req, res, next) => {
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      $or: [
        { title: { $regex: queryRegex } },
        { "artist.displayName": { $regex: queryRegex } },
      ],
    };
  }
  try {
    const song = await fetch(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};
const getSongById = async (req, res, next) => {
  const song = await fetchById(req.params.id);
  if (!song) {
    return res.json({
      success: false,
      data: {
        message: "Song does not exist.",
      },
    });
  }
  return res.json({
    success: true,
    data: { song },
  });
};
const deleteSong = async (req, res, next) => {
  try {
    const song = await remove(req.params.id);
    return res.json({
      success: true,
      data: { song, message: "Song has been deleted." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getTrendingSongs = async (req, res, next) => {
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      $or: [
        { title: { $regex: queryRegex } },
        { "artist.displayName": { $regex: queryRegex } },
      ],
    };
  }
  try {
    const song = await fetchTrendingSongs(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const increaseSongPlayCount = async (req, res, next) => {
  const song = await fetchById(req.params.id);
  if (!song) {
    return res.status(404).json({
      success: false,
      data: {
        message: "Song does not exist.",
      },
    });
  }
  try {
    await update(song._id, { playCount: song.playCount + 1 });
    return res.status(200).json({
      success: true,
      data: {
        message: "Play count has been increased.",
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getPopularSongs = async (req, res, next) => {
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      $or: [
        { title: { $regex: queryRegex } },
        { "artist.displayName": { $regex: queryRegex } },
      ],
    };
  }
  try {
    const song = await fetchPopularSongs(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getRecommendedSongs = async (req, res, next) => {
  const user = userModel.fetchById(req.userId);
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      $or: [
        { title: { $regex: queryRegex } },
        { "artist.displayName": { $regex: queryRegex } },
      ],
    };
  }
  try {
    const song = await fetch(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getSongsByArtist = async (req, res, next) => {
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      artist: { $regex: queryRegex },
    };
  }
  try {
    const song = await fetch(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

const getSongsByGenre = async (req, res, next) => {
  let findParams = {};
  const { limit, page, keyword } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      genre: { $regex: queryRegex },
    };
  }
  try {
    const song = await fetch(findParams, paginationParams);
    return res.json({
      success: true,
      data: { song },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

module.exports = {
  createSong,
  updateSong,
  getSongById,
  getSongs,
  deleteSong,
  getTrendingSongs,
  increaseSongPlayCount,
  getPopularSongs,
  getRecommendedSongs,
  getSongsByArtist,
  getSongsByGenre,
};
