const { fetchById } = require("../model/artist");

async function validateArtist(artistId) {
  const artist = await fetchById(artistId);
  if (!artist) throw new Error("Artist does not exist.");
  return artist;
}

module.exports = {
  validateArtist,
};
