import { apiErrorResponse, decryptText } from "../helper/helper.js";

export const middleware = async (req, res, next) => {
  try {
    let authToken = req.get("authorization");

    if (!authToken) {
      return apiErrorResponse({
        res,
        error: { message: "unauthorized" },
        statusCode: 401,
      });
    }

    let token = authToken?.split("Bearer")[1];
    let decryptRes = await decryptText(token);
    if (decryptRes) {
      req.userDetails = decryptRes;
      next();
    }
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};
