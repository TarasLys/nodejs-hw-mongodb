import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).min(3).max(20).required().messages({
    'string.pattern.base': 'Phone number should contain only digits and be between 10 and 15 characters long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').required().default('personal').messages({
    'any.only': 'Contact type must be one of work, home, or personal',
    'any.required': 'Contact type is required',
  }),
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

