const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
	const organizer = req.user.organizer;
	const result = await Categories.find({ organizer: organizer });
	return result;
};

const createCategories = async (req) => {
	const { name } = req.body;
	const { organizer } = req?.user;

	const isDuplicate = await Categories.find({
		name: name,
		organizer: organizer,
	});

	if (!isDuplicate)
		throw new BadRequestError("Nama kategori memiliki duplikat");

	const result = await Categories.create({ name, organizer });
	return result;
};

const getOneCategory = async (req) => {
	const { id } = req.params;
	const { organizer } = req?.user;
	const result = await Categories.findOne({ _id: id, organizer });

	if (!result) throw new NotFoundError(`Id Categories: ${id} tidak ditemukan`);

	return result;
};

const updateCategory = async (req) => {
	const { id } = req.params;
	const { name } = req.body;
	const { organizer } = req?.user;

	const result = await Categories.findOne({ _id: id, organizer });

	if (!result) throw new NotFoundError(`Id Categories: ${id} tidak ditemukan`);

	const isDuplicate = await Categories.findOne({ name, _id: { $ne: id } });

	if (isDuplicate) throw new BadRequestError("Nama kategori memiliki Duplikat");

	result.name = name;
	await result.updateOne({ name }, { new: true, runValidators: true });
	return result;
};

const deleteCategory = async (req) => {
	const { id } = req.params;
	const { organizer } = req?.user;

	const result = await Categories.findOne({ _id: id, organizer });
	if (!result) throw new NotFoundError(`Category ${id} tidak ditemukan`);
	await result.remove();
	return result;
};

const checkCategory = async (id) => {
	const result = await Categories.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada category dengan Id: ${id}`);

	return result;
};

module.exports = {
	getAllCategories,
	createCategories,
	getOneCategory,
	updateCategory,
	deleteCategory,
	checkCategory,
};
