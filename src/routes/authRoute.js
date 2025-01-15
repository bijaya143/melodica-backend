const { Router } = require("express");

const {
  createValidator,
  loginValidator,
} = require("../common/validations/auth/authValidator");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/login", loginValidator, authController.login);

authRouter.post("/register", createValidator, authController.register);

authRouter.post("/oauth", createValidator, authController.oauth);

module.exports = {
  authRouter,
};
