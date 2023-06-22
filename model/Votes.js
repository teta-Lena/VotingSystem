const mongoose = require("mongoose");
const Joi = require("joi");
const mongoosePaginate = require("mongoose-paginate-v2");



var schema = mongoose.Schema(
  {
    candidate: {
      type: String,
      required: true,
      ref: "candidate",
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
schema.plugin(mongoosePaginate);

const Votes = mongoose.model("votes", schema);

module.exports = Votes;
module.exports.validateVotes = (body) => {
  return Joi.object({
    candidate: Joi.string().required(),
    user: Joi.string().required(),
  }).validate(body);
};
