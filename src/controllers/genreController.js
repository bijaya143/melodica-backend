const { create, update, fetch, fetchById, remove } = require("../model/genre");

const getGenres = async (req, res, next) => {
  const { limit, page } = req.query;
  const paginationParams = {
    limit: limit,
    skip: (page - 1) * limit,
  };
  try {
    const genre = await fetch({}, paginationParams);
    return res.json({
      success: true,
      data: { genre },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
};

const getGenreById = async (req, res, next) => {
  const genre = await fetchById(req.params.id);
  if (!genre) {
    return res.json({
      success: false,
      data: {
        message: "Genre does not exist.",
      },
    });
  }
  return res.json({
    success: true,
    data: { genre },
  });
};

const createGenre = async (req, res, next) => {
  try {
    const genre = await create(req.body);
    return res.json({
      success: true,
      data: { genre, message: "Genre has been created." },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
};

const updateGenre = async (req, res, next) => {
  // Validation
  const genre = await fetchById(req.params.id);
  if (!genre) {
    return res.status(404).json({
      success: false,
      data: { message: "Genre does not exist." },
    });
  }
  try {
    const genre = await update(req.params.id, req.body);
    return res.json({
      success: true,
      data: { genre, message: "Genre has been updated." },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
};

const deleteGenre = async (req, res, next) => {
  try {
    const genre = await remove(req.params.id);
    return res.json({
      success: true,
      data: { genre, message: "Genre has been deleted." },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
};

module.exports = {
  getGenreById,
  getGenres,
  updateGenre,
  createGenre,
  deleteGenre,
};
