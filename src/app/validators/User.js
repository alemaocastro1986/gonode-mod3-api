const joi = require('joi')

module.exports = {
  body: {
    name: joi
      .string()
      .max(120)
      .min(3)
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .required()
      .min(6)
  }
}
