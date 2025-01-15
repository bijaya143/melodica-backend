const { fetchById, update, fetch } = require("../model/user");
const { compare, hash } = require("../service/passwordService");
const { uploadFileToLocal } = require("../service/uploadService");

const filePrefix = "users";

const me = async (req, res, next) => {
  const user = await getUser(req.userId); // Validation
  if (!user) {
    return res.json({
      success: false,
      data: {
        message: "User does not exist.",
      },
    });
  }
  // Excluding Password
  const userObject = user.toObject();
  delete userObject["password"];
  return res.json({
    success: true,
    data: { userObject },
  });
};

const updateMe = async (req, res, next) => {
  const user = await getUser(req.userId); // Validation
  if (!user) {
    return res.json({
      success: false,
      data: {
        message: "User does not exist.",
      },
    });
  }

  // Remove Null keys from the request body
  req.body = await removeNullUndefined(req.body);
  let key = user.imageUrl;
  // Image Update
  if (req.files && req.files?.["image"]) {
    const path = await uploadFileToLocal(req.files.image, filePrefix);
    key = `/api/${path}`;
  }
  try {
    await update(req.userId, { imageUrl: key, ...req.body });
    return res.json({
      success: true,
      data: {
        message: "User has been updated.",
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const updatePassword = async (req, res, next) => {
  if (!req.body.oldPassword) {
    return res.json({
      success: false,
      data: {
        message: "Old password is required.",
      },
    });
  }
  if (!req.body.newPassword) {
    return res.json({
      success: false,
      data: {
        message: "New Password is required.",
      },
    });
  }

  const user = await getUser(req.userId); // Validation
  if (!user) {
    return res.status(400).json({
      success: false,
      data: {
        message: "User does not exist.",
      },
    });
  }
  const matchPassword = await compare(req.body.oldPassword, user.password);
  if (!matchPassword) {
    return res.status(400).json({
      success: false,
      data: {
        message: "Old password does not match.",
      },
    });
  }
  const hashedPassword = await hash(req.body.newPassword);
  try {
    await update(req.userId, { password: hashedPassword });
    return res.json({
      success: true,
      data: {
        message: "User Password has been updated.",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {
        message: error.message,
      },
    });
  }
};

const getUser = async (userId) => {
  return await fetchById(userId);
};

const getUsers = async (req, res) => {
  try {
    const users = await fetch();
    return res.status(201).json({
      success: true,
      data: {
        users: users,
        message: "Users has been fetched",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal Server Error",
      },
    });
  }
};

const removeNullUndefined = async (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

module.exports = {
  me,
  updateMe,
  updatePassword,
  getUsers,
};
