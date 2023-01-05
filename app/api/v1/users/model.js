const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UsersSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Nama harus diisi"],
		},
		email: {
			type: String,
			required: [true, "Email harus diisi"],
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "organizer", "owner"],
			default: "admin",
		},
		organizer: {
			type: mongoose.Types.ObjectId,
			ref: "Organizer",
			required: true,
		},
	},
	{ timestamps: true }
);

UsersSchema.pre("save", async function (next) {
	const User = this;
	console.log("User");
	console.log(User);
	if (User.isModified("password")) {
		const salt = await bcrypt.genSalt(12);
		User.password = await bcrypt.hash(User.password, salt);
	}
	next();
});

UsersSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

module.exports = model("User", UsersSchema);
