const { Router } = require("express");
const config = require("../config");
const path = require("path");
const { uploadFileToLocal } = require("../service/uploadService");

const uploadRouter = Router();

const rootDir = process.cwd();

uploadRouter.post("/upload", async function (req, res) {
  if (!req.query.filePrefix) {
    throw new Error("Please provide file prefix");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const path = await uploadFileToLocal(req.files.file, req.query.filePrefix);
    // const fullUrl = `${req.protocol}://${req.get("host")}/api/${path}`;
    const fullUrl = `/api/${path}`;
    return res.send(fullUrl);
  } catch (error) {
    return res.status(400).send(error);
  }
});

uploadRouter.get("/public/uploads/:folderName/:fileName", (req, res) => {
  const filename = req.params.fileName;
  const folderName = req.params.folderName;
  const filePath = path.join(rootDir, config.FILE_PATH, folderName, filename);

  // Send the file as a response
  res.sendFile(filePath, (err) => {
    if (err) {
      // If an error occurs while sending the file, handle it here
      // console.error(err);
      res.status(400).end();
    } else {
      // console.log(`File ${filename} sent successfully.`);
    }
  });
});

module.exports = {
  uploadRouter,
};
