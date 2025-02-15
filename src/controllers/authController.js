const { fetch, create } = require("../model/user");
const { sign } = require("../service/jwtService");
const { compare, hash } = require("../service/passwordService");

/**
 * Handles user login by verifying email and password.
 * If authentication is successful, generates and returns an access token.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Fetch the user by email
    const [user] = await fetch({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    // Compare the provided password with the stored hashed password
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      throw new Error("Password does not match");
    }

    // Prepare token payload
    const tokenDetails = {
      id: user._id,
      email: user.email,
      userType: user.userType,
    };

    // Generate access token
    const accessToken = await sign(tokenDetails, false);

    const data = { accessToken };

    return res.json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ success: false, data: error.message });
  }
};

/**
 * Handles new user registration.
 * Hashes the password, creates a new user, and returns an access token.
 */
const register = async (req, res, next) => {
  try {
    // Hash the user’s password before saving
    const hashedPassword = await hash(req.body.password);
    // Create a new user record in the database
    const user = await create({ ...req.body, password: hashedPassword });
    const tokenDetails = {
      id: user._id,
      email: user.email,
      userType: user.userType,
    };
    const accessToken = await sign(tokenDetails, false);
    const data = { accessToken };
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

/**
 * Handles OAuth authentication.
 * If the user exists, logs them in and returns an access token.
 * If the user does not exist, creates a new account and then returns an access token.
 */
const oauth = async (req, res, next) => {
  const { email } = req.body;
  const [existedUser] = await fetch({ email });
  if (!existedUser) {
    try {
      const hashedPassword = await hash(req.body.password);
      const user = await create({ ...req.body, password: hashedPassword });
      const tokenDetails = {
        id: user._id,
        email: user.email,
        userType: user.userType,
      };
      const accessToken = await sign(tokenDetails, false);
      const data = { accessToken };
      return res.json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  } else {
    const tokenDetails = {
      id: existedUser._id,
      email: existedUser.email,
      userType: existedUser.userType,
    };
    const accessToken = await sign(tokenDetails, false);
    const data = { accessToken };
    return res.json({ success: true, data });
  }
};

module.exports = {
  login,
  register,
  oauth,
};
