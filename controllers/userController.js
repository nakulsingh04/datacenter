import { apiErrorResponse, apiResponse, tryCatch } from "../helper/helper.js";
import User from "../models/userModel.js";

const login = tryCatch((req, res) => {
  console.log("test");
  let finalData = {
    name: "kamal",
    age: 25,
  };
  // throw{"message":"no found"}
  apiResponse({ res, data: finalData });
});

const registartion = async (req, res) => {
  try {
    const { body } = req;
    const userRes = await User.create(body);
    if (!userRes) {
      throw { message: "User not created" };
    }
    console.log(userRes, "test");

    apiResponse({ res, data: userRes });
  } catch (error) {
    apiErrorResponse({ res, error });
  }
};


const getUsers = async (req, res) => {
    try {
      const { body } = req;
      const userRes = await User.find({name:"kamal"});
      if (!userRes?.length) {
        throw { message: "Users not found" };
      }
      console.log(userRes, "test");
      // throw{"message":"no found"}
      apiResponse({ res, data: userRes });
    } catch (error) {
      apiErrorResponse({ res, error });
    }
  };

export default { login, registartion ,getUsers};
