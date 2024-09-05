import Joi from 'joi';
const userRegistrationValiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const userLoginValiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });



  export default {userRegistrationValiSchema,userLoginValiSchema}