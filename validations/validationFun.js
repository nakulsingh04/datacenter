import * as Joi from "joi";
import { apiErrorResponse } from "../helper/helper.js";

export const validateData = (data, schema) => {
  return schema.validate(data, { abortEarly: false });
};
export const JoiValidationFun = (validationData) => {
  return function (req, res, next) {
    try {
      const { body = null, query = null } = req;
      let data = body || query;
      let validationRes = validateData(data, validationData);
      if (validationRes?.error) {
        let errorArray = validationRes?.error?.details || [];

        let allErrorsArray = errorArray.map((item) => {
          return item.message;
        });
        let finalErrors = allErrorsArray?.join(", ");
        throw {
          message: `Validation failed: ${finalErrors}`,
        };
      }
      next();
    } catch (err) {
      console.error(err, "JoiValidationFun function error");
      apiErrorResponse({ res, error: err });
    }
  };
};
