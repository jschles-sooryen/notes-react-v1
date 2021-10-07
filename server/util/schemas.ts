/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const folderRequestSchema = Joi.object({
  name: Joi.string().required(),
});

export const noteRequestSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
