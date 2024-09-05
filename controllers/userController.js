import {
  apiErrorResponse,
  apiResponse,
  comparePassword,
  encryptText,
  tryCatch,
} from "../helper/helper.js";
import userService from "../services/userService.js";

const login = async (req, res) => {
  try {
    const { body } = req;
    const { email = "", password = "" } = body || "";
    let findUser = await userService.findOneUser({ email: email });
    let isPassMatch = await comparePassword({
      passRecieved: password,
      passInDB: findUser?.password || "",
    });
    if (!isPassMatch) {
      throw { message: "Not a valid email or password" };
    }
    const { email: userEmail, _id } = findUser || "";
    const { password: userPassword, ...rest } = findUser || "";
    let jwtToken = await encryptText({ email: userEmail, _id });
    apiResponse({ res, data: rest, token: jwtToken });
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};

const registartion = async (req, res) => {
  try {
    const { body } = req;
    await userService.isUserExistWithEmail({ email: body?.email });
    const userRes = await userService.create(body);
    apiResponse({ res, data: userRes });
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};

const getUsers = async (req, res) => {
  try {
    const { body } = req;
    const userRes = await userService.find();
    console.log(userRes, "test");
    // throw{"message":"no found"}
    apiResponse({ res, data: userRes });
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { userDetails } = req;
    const {_id}=userDetails||""


    console.log(req,"reqreqreqreqreqreqreqreqreqreqreq>>")
    const userRes = await userService.findOne({_id});
    console.log(userRes, "test");
    // throw{"message":"no found"}
    apiResponse({ res, data: userRes });
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};

export default { login, registartion, getUsers,getUserDetail };
