const Events = require("../../api/v1/events/model");
const { NotFoundError, BadRequestError } = require("../../errors");
const { checkCategory } = require("./categories");
const { checkImages } = require("./images");
const { checkTalent } = require("./talents");

const getAllEvents = async (req) => {
	const { keyword, talents, categories } = req.query;

	let condition = {};

	if (keyword) {
		condition = { ...condition, title: { $regex: keyword, $options: "i" } };
	}

	if (categories) {
		condition = { ...condition, categories };
	}

	if (talents) {
		condition = { ...condition, talents };
	}

	const result = await Events.find(condition)
		.populate({
			path: "image",
			select: "_id url",
		})
		.populate({
			path: "category",
			select: "_id name",
		})
		.populate({
			path: "talent",
			select: "_id name role image",
			populate: {
				path: "image",
				select: "_id url",
			},
		});

	return result;
};

const getOneEvents = async (req) => {
	const { id } = req.params;
	const result = await Events.findOne({ _id: id })
		.populate({
			path: "image",
			select: "_id url",
		})
		.populate({
			path: "category",
			select: "_id name",
		})
		.populate({
			path: "talent",
			select: "_id name role image",
			populate: {
				path: "image",
				select: "_id url",
			},
		});

	if (!result)
		throw new NotFoundError(`Event dengan id: ${id} tidak ditemukan`);
	return result;
};

const createEvents = async (req) => {
	const {
		title,
		date,
		about,
		tagline,
		vanueName,
		keyPoints,
		statusEvent,
		tickets,
		image,
		category,
		talent,
	} = req.body;

	await checkImages(image);
	await checkCategory(category);
	await checkTalent(talent);

	const check = await Events.findOne({ title });

	if (check)
		throw new BadRequestError(`Event dengan title: ${title} sudah terdaftar`);

	const result = await Events.create({
		title,
		date,
		about,
		tagline,
		vanueName,
		keyPoints,
		statusEvent,
		tickets,
		image,
		category,
		talent,
	});
	return result;
};

const updateEvents = async (req) => {
	const { id } = req.params;
	const {
		title,
		date,
		about,
		tagline,
		vanueName,
		keyPoints,
		statusEvent,
		tickets,
		image,
		category,
		talent,
	} = req.body;

	let updatedValue = {
		title,
		date,
		about,
		tagline,
		vanueName,
		keyPoints,
		statusEvent,
		tickets,
	};

	const check = await Events.findOne({ _id: id });

	if (!check) throw new NotFoundError(`Event dengan Id: ${id} tidak ditemukan`);

	const isDuplicate = await Events.findOne({ title, _id: { $ne: id } });

	if (isDuplicate)
		throw new BadRequestError(`Event dengan title: ${title} sudah terdaftar`);

	if (image) {
		await checkImages(image);
		updatedValue = { ...updatedValue, image };
	}
	if (category) {
		await checkCategory(category);
		updatedValue = { ...updatedValue, category };
	}
	if (talent) {
		console.log("updating talent", talent);
		await checkTalent(talent);
		updatedValue = { ...updatedValue, talent };
	}

	const result = await Events.findByIdAndUpdate(id, updatedValue, {
		new: true,
		runValidators: true,
	});
	return result;
};

const deleteEvents = async (req) => {
	const { id } = req.params;

	const result = await Events.findOne({ _id: id });
	if (!result)
		throw new NotFoundError(`Event dengan id: ${id} tidak ditemukan`);

	await result.remove();
	return result;
};

module.exports = {
	getAllEvents,
	createEvents,
	updateEvents,
	getOneEvents,
	deleteEvents,
};
