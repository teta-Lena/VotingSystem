const mongoose = require("mongoose");
const Joi = require("joi");
const mongoosePaginate = require("mongoose-paginate-v2");

var schema = mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    missionStatement: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
schema.plugin(mongoosePaginate);

const Model = mongoose.model("candidate", schema);

module.exports.Candidate = Model;
module.exports.validateCandidate = (body) => {
  return Joi.object({
    names: Joi.string().required(),
    profilePicture: Joi.string(),
    gender: Joi.string().valid("male", "female").required(),
    missionStatement: Joi.string().required(),
    nid: Joi.string()
      .pattern(/(?<!\d)\d{16}(?!\d)/)
      .length(16)
      .required(),
  }).validate(body);
};
