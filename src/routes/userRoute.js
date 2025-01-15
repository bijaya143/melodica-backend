const { Router } = require("express");
const { authorize, adminAuthorize } = require("../service/authService");
const userController = require("../controllers/userController");
const { updateValidator } = require("../common/validations/user/userValidator");

const userRouter = Router();

userRouter.patch("/me", authorize, updateValidator, userController.updateMe);
userRouter.patch(
  "/change-password",
  authorize,
  updateValidator,
  userController.updatePassword
);
userRouter.get("/me", authorize, userController.me);

userRouter.get("", adminAuthorize, userController.getUsers);

module.exports = {
  userRouter,
};
