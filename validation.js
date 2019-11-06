// VALIDATION
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

const registerValidation = data => {
  return schemaRegister.validate(data);
};

module.exports.registerValidation = registerValidation;
