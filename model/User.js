const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  //   role: { type: String, enum: ['voter', 'admin'], default: 'voter' }
});

userSchema.method.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.TOKEN,
    {
      expiresIn: "5h",
    }
  );
};
const User = mongoose.model("User", userSchema);

const validation = (body) => {
  return joi
    .object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    })
    .validate(body);
};
const loginvalidation = (body) => {
  return joi
    .object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .validate(body);
};

module.exports = { User, validation };
