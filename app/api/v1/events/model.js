const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TicketCategoriesSchema = new Schema({
	type: {
		type: String,
		required: [true, "Tipe tiket harus diisi"],
	},
	price: {
		type: Number,
		default: 0,
	},
	stock: {
		type: Number,
		default: 0,
	},
	statusTicketCategories: {
		type: Boolean,
		enum: [true, false],
		default: true,
	},
	expired: {
		type: Date,
	},
});

const EventsSchema = new Schema(
	{
		title: {
			type: "string",
			required: [true, "Title tidak boleh kosong"],
			minlength: 3,
			maxlength: 50,
		},
		date: {
			type: Date,
			required: [true, "Tanggal dan waktu harus diisi"],
		},
		about: {
			type: String,
		},
		tagline: {
			type: String,
			required: [true, "Tagline harus diisi"],
		},
		keyPoints: {
			type: [String],
		},
		vanueName: {
			type: String,
			required: [true, "Tempat Acara harus diisi"],
		},
		statusEvent: {
			type: String,
			enum: ["Draft", "Published"],
		},
		tickets: {
			type: [TicketCategoriesSchema],
			required: true,
		},
		image: {
			type: mongoose.Types.ObjectId,
			ref: "Image",
			required: [true, "Image harus diisi"],
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: [true, "Categories harus diisi"],
		},
		talent: {
			type: mongoose.Types.ObjectId,
			ref: "Talent",
			required: [true, "Talents harus diisi"],
		},
	},
	{ timestamps: true }
);

module.exports = model("Event", EventsSchema);
