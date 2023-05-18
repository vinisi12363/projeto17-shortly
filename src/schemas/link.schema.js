import Joi from 'joi';

export const linkSchema = Joi.object({
  url: Joi.string().uri().required(),
});
