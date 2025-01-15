const { create, update } = require("../model/song");
const { validateArtist } = require("./artistService");
const { validateGenres, validateGenre } = require("./userGenreService");

async function storeSong(title, artistId, genreId, imageKey, audioKey) {
  const artist = await validateArtist(artistId);
  const existedGenre = await validateGenre(genreId);
  try {
    return await create({
      title: title,
      artist: artist.displayName,
      genre: existedGenre.name,
      imageUrl: imageKey,
      audioUrl: audioKey,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function editSong(song, title, artistId, genreId, imageKey, audioKey) {
  const updateSongData = {
    title: song.title,
    artist: song.artist,
    genre: song.genre,
    imageUrl: imageKey,
    audioUrl: audioKey,
  };
  if (artistId) {
    const artist = await validateArtist(artistId);
    updateSongData.artist = artist.displayName;
  }
  if (genreId) {
    const genre = await validateGenre(genreId);
    updateSongData.genre = genre.name;
  }
  if (title) {
    updateSongData.title = title;
  }
  try {
    return await update(song._id, updateSongData);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  storeSong,
  editSong,
};
