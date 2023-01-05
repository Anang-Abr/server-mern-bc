const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImagesSchema = new Schema(
	{
		url: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = model("Image", ImagesSchema);
