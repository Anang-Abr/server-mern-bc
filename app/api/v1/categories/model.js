const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			minLength: [3, "Panjang nama kategori minimal 3 huruf"],
			maxLength: [20, "Panang nama kategori maksimal 20 huruf"],
			required: [true, "Nama kategori harus diisi"],
		},
		organizer: {
			type: mongoose.Types.ObjectId,
			ref: "Organizer",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Category", categorySchema);
