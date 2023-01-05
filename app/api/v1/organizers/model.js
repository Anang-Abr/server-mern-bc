const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrganizersSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Nama harus diisi"],
		},
	},
	{ timestamps: true }
);

module.exports = model("Organizer", OrganizersSchema);
