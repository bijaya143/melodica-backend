const { create, update, fetch, fetchById, remove } = require("../model/artist");
const { uploadFileToLocal } = require("../service/uploadService");

const filePrefix = "artists";
/**
 * Get a list of artists with optional search and pagination.
 * Supports filtering by keyword (case-insensitive search on display name).
 */
const getArtists = async (req, res, next) => {
  const findParams = {};
  const { limit, page, keyword } = req.query;
  // Setup pagination parameters
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  // Apply keyword filter if provided
  if (keyword) {
    findParams.displayName = { $regex: keyword, $options: "i" };
  }
  try {
    const artist = await fetch(findParams, paginationParams);
    return res.json({
      success: true,
      data: { artist },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get artist details by their unique ID.
 */
const getArtistById = async (req, res, next) => {
  const artist = await fetchById(req.params.id);
  if (!artist) {
    return res.json({
      success: false,
      data: {
        message: "Artist does not exist.",
      },
    });
  }
  return res.json({
    success: true,
    data: { artist },
  });
};

/**
 * Create a new artist with an image.
 * The image is required and is uploaded to local storage.
 */
const createArtist = async (req, res, next) => {
  // Image Validation
  if (!req.files && !req.files?.["image"]) {
    return res.status(400).json({
      success: false,
      data: { message: "Image is required." },
    });
  }
  try {
    // Image record
    const path = await uploadFileToLocal(req.files.image, filePrefix);
    const key = `/api/${path}`;
    const artist = await create({ imageUrl: key, ...req.body });
    return res.json({
      success: true,
      data: { artist, message: "Artist has been created." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

/**
 * Update an artist's details, including their image if provided.
 */
const updateArtist = async (req, res, next) => {
  // Validation
  const artist = await fetchById(req.params.id);
  if (!artist) {
    return res.status(404).json({
      success: false,
      data: { message: "Artist does not exist." },
    });
  }

  let key = artist.imageUrl; // Retain existing image URL by default

  // Image Update
  if (req.files && req.files?.["image"]) {
    const path = await uploadFileToLocal(req.files.image, filePrefix);
    key = `/api/${path}`;
  }
  try {
    const artist = await update(req.params.id, { imageUrl: key, ...req.body });
    return res.json({
      success: true,
      data: { artist, message: "Artist has been updated." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

/**
 * Delete an artist by ID.
 */
const deleteArtist = async (req, res, next) => {
  try {
    const artist = await remove(req.params.id);
    return res.json({
      success: true,
      data: { artist, message: "Artist has been deleted." },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

/**
 * Increase the stream count of an artist based on a keyword search.
 * If multiple matches exist, only the first result is updated.
 */
const increaseArtistStreamCount = async (req, res, next) => {
  const { keyword } = req.query;
  let findParams = {};

  // Apply keyword filter if provided
  if (keyword) {
    const queryRegex = new RegExp(keyword, "i");
    findParams = {
      displayName: { $regex: queryRegex },
    };
  }
  const artists = await fetch(findParams);
  if (artists.length == 0) {
    return res.status(404).json({
      success: false,
      data: {
        message: "Artist does not exist.",
      },
    });
  }
  try {
    await update(artists[0]._id, { streamCount: artists[0].streamCount + 1 });
    return res.status(200).json({
      success: true,
      data: {
        message: "Stream count has been increased.",
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, data: { message: error.message } });
  }
};

module.exports = {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  increaseArtistStreamCount,
};
