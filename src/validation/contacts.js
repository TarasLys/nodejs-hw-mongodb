import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': `Username should have at least {{#limit}} characters`,
    'string.max': `Username should have at most {{#limit}} characters`,
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email address',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be a valid format and contain 7-15 digits.',
      'any.required': 'Phone number is required',
    }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')

    .messages({
      'any.only': 'Contact type must be one of work, home, or personal',
    }),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': `Username should have at least {{#limit}} characters`,
    'string.max': `Username should have at most {{#limit}} characters`,
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email address',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be a valid format and contain 7-15 digits.',
    }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of work, home, or personal',
  }),
  isFavourite: Joi.boolean(),
});







