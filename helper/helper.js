import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envValues } from "./envHelper.js";
export const apiResponse = (objectData) => {
  const { res, data, statusCode = 200,message="Success",...rest } = objectData;
  return res.json({
    statusCode: statusCode,
    data: data,
    message:message,
    ...rest
  });
};

export const apiErrorResponse = (objectData) => {
    const { res, error, statusCode = 400 } = objectData;
    console.error(error)
    return res.json({
      statusCode: statusCode,
      message: error?.message,
    });
  };
  
  export const  tryCatch=(fn)=> {
    return function(...args) {
      try {
        return fn(...args); 
    }catch(error){
          console.error('An error occurred:', error); 

      }}
    
  }


  export const decryptText = async (token) => {
    try {
      const data = await jwt.verify(
        token?.trim(),
        envValues.JWT_KEY || ""
      );
      // @ts-ignore
      if (!data) {
        throw {"message":"Invalid token"}
      }
      return data;
    } catch (err) {
      console.log(err, "decryptText function error");
      throw {"message":"Invalid token"}
    }
  };
  // This will encrypt givien data (object) using JWT - return encrypted string
  export const encryptText = async (data , expiresIn = "20h") => {
    const token = jwt.sign(data, envValues.JWT_KEY || "", {
      expiresIn,
    });
    return token;
  };
  
  // This will create a hash of password - return hashed string
  export const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  };
  
  // This will compare a hashed and unhashed password - return boolean
  export const comparePassword = async (data) => {
    const { passRecieved, passInDB } = data || "";
    return await bcrypt.compare(passRecieved, passInDB);
  };