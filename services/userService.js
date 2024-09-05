import { hashPassword } from "../helper/helper.js";
import UserModel from "../models/userModel.js";

const create = async (data) => {
  if (data?.password) {
    let newPassword = await hashPassword(data?.password);
    data.password = newPassword;
  }
  const userRes = await UserModel.create(data);
  if (!userRes) {
    throw { message: "User not created" };
  }
  return userRes;
};

const find = async (data = {}) => {
  const userRes = await UserModel.find(data);
  if (!userRes?.length) {
    throw { message: "Users not found" };
  }
  return userRes;
};

const findOne = async (data = {}) => {
  const userRes = await UserModel.findOne(data).lean();
  if (!userRes) {
    throw { message: "User not found" };
  }
  return userRes;
};

const findOneUser = async (data = {}) => {
  const userRes = await UserModel.findOne(data).lean();
  return userRes;
};

const isUserExistWithEmail = async (data = {}) => {
  const userRes = await UserModel.findOne(data).lean();
  if (userRes) {
    throw {
      message:
        "This email address is already associated with an existing account. Please log in or use a different email to register",
    };
  }
  return userRes;
};

export default { create, find, findOne, isUserExistWithEmail,findOneUser };
