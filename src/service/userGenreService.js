const { fetchById } = require("../model/genre");
const { update } = require("../model/user");

async function storeUserGenres(userId, genres) {
  const userGenres = await validateGenres(genres);
  try {
    update(userId, { genres: userGenres });
    return "success";
  } catch (error) {
    return error;
  }
}

async function validateGenres(genres) {
  let userGenres = [];
  await Promise.all(
    genres.map(async (genreId) => {
      const existedGenre = await fetchById(genreId);
      if (!existedGenre) {
        throw new Error("Invalid Genre has been passed.");
      } else {
        userGenres.push(existedGenre);
        return;
      }
    })
  );
  return userGenres;
}

async function validateGenre(genreId) {
  const existedGenre = await fetchById(genreId);
  if (!existedGenre) {
    throw new Error("Invalid Genre has been passed.");
  } else {
    return existedGenre;
  }
}

module.exports = {
  storeUserGenres,
  validateGenres,
  validateGenre,
};
