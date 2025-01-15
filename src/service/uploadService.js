const config = require("../config");
const fs = require("fs");
const { whiteSpaceToHyphen } = require("../util/stringUtil");

const basePath = config.FILE_PATH;

/**
 *
 * @param {*} file
 * @param {*} filePrefix
 * @returns file path
 */
async function uploadFileToLocal(file, filePrefix) {
  let uploadPath;

  const folderPath = `${basePath}${filePrefix}/`;

  // Create the upload directory if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Final upload path
  uploadPath = `${folderPath}${Date.now()}__${await whiteSpaceToHyphen(
    file.name
  )}`;

  try {
    file.mv(uploadPath);
    return uploadPath;
  } catch (error) {
    return error;
  }
}

module.exports = {
  uploadFileToLocal,
};
