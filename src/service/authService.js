const { verify } = require("./jwtService");

async function authorize(request, response, next) {
  try {
    if (!request) throw new Error("Not Authorized.");
    if (!request["headers"]) throw new Error("Not Authorized.");
    if (!request["headers"]["authorization"])
      throw new Error("Not Authorized.");

    const authorizationHeader = request["headers"]["authorization"];
    const accessToken = authorizationHeader.split(" ");

    if (accessToken.length < 1) throw new Error("Not Authorized.");

    const { id } = await verify(accessToken[1]);
    request.userId = id;

    next();
  } catch (error) {
    return response
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
}

async function adminAuthorize(request, response, next) {
  try {
    if (!request) throw new Error("Not Authorized.");
    if (!request["headers"]) throw new Error("Not Authorized.");
    if (!request["headers"]["authorization"])
      throw new Error("Not Authorized.");

    const authorizationHeader = request["headers"]["authorization"];
    const accessToken = authorizationHeader.split(" ");

    if (accessToken.length < 1) {
      throw new Error("Not Authorized.");
    }

    const { id, userType } = await verify(accessToken[1]);

    if (userType !== "admin") throw new Error("Access only for admin.");

    request.userId = id;

    next();
  } catch (error) {
    return response
      .status(401)
      .json({ success: false, data: { message: error.message } });
  }
}

module.exports = {
  authorize,
  adminAuthorize,
};
