const Talents = require("../../api/v1/talents/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkImages } = require("./images");

const getAllTalents = async (req) => {
	const { keyword } = req.query;

	let condition = {};

	if (keyword) {
		condition = { ...condition, name: { $regex: keyword, $options: "i" } };
	}

	const result = await Talents.find(condition)
		.populate({
			path: "image",
			select: "_id url",
		})
		.select("_id name role image");
	return result;
};

const getOneTalents = async (req) => {
	const { id } = req.params;

	const result = await Talents.findOne({ _id: id })
		.populate({
			path: "image",
			select: "_id url",
		})
		.select("_id name role image");

	if (!result) throw new NotFoundError(`Tidak ada talents dengan Id: ${id}`);
	return result;
};

const createTalents = async (req) => {
	const { name, role, image } = req.body;

	await checkImages(image);

	const check = await Talents.findOne({ name });

	if (check) throw new BadRequestError("Pembicara sudah terdaftar");

	const result = await Talents.create({ name, role, image });

	return result;
};

const updateTalents = async (req) => {
	const { id } = req.params;
	const { name, role, image } = req.body;
	let updatedValue = { name, role };

	const check = await Talents.findOne({ _id: id });
	if (!check) throw new NotFoundError(`Tidak ada talent dengan Id: ${id}`);

	if (image) {
		await checkImages(image);
		updatedValue = { ...updatedValue, image };
	}

	const isDuplicate = await Talents.findOne({ name: name, _id: { $ne: id } });

	if (isDuplicate) throw new BadRequestError(`Talents ${name} sudah terdaftar`);

	const result = await Talents.findByIdAndUpdate(id, updatedValue, {
		new: true,
		runValidators: true,
	});

	return result;
};

const deleteTalents = async (req) => {
	const { id } = req.params;

	const result = await Talents.findOne({ _id: id });
	if (!result) throw new NotFoundError(`Tidak ada talent dengan Id: ${id}`);

	await result.remove();
	return result;
};

const checkTalent = async (id) => {
	const result = await Talents.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada talent dengan Id: ${id}`);

	return result;
};

module.exports = {
	getAllTalents,
	createTalents,
	getOneTalents,
	updateTalents,
	deleteTalents,
	checkTalent,
};
