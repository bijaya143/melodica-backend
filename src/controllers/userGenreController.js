const { storeUserGenres } = require("../service/userGenreService");

const create = async (req, res, next) => {
  try {
    await storeUserGenres(req.userId, req.body.genres);
    return res.json({
      success: true,
      data: { message: "Genres has been successfully selected by the user." },
    });
  } catch (error) {
    return res.json({
      success: false,
      data: { message: error.message },
    });
  }
};

module.exports = {
  create,
};
