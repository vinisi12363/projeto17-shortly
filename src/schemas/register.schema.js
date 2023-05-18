import Joi from 'joi';

export const RegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');
