const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
	const url = req.file
		? `uploads/${req.file.filename}`
		: "uploads/avatar/default.jpg";
	const result = await Images.create({ url });

	return result;
};

const getImages = async (req) => {
	const result = await Images.find();
	return result;
};

const checkImages = async (id) => {
	const result = await Images.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada gambar dengan Id: ${id}`);

	return result;
};
module.exports = {
	createImages,
	checkImages,
	getImages,
};
