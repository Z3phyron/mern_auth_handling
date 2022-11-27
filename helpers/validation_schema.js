const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

const signUpSchema = Joi.object({
  firstName: Joi.string().min(4).max(10).required(),
  lastName: Joi.string().min(4).max(10).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity().required(),
});

module.exports = {
  signUpSchema,
  signInSchema
}