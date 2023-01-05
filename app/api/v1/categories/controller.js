const { StatusCodes } = require("http-status-codes");
const {
	getAllCategories,
	createCategories,
	getOneCategory,
	updateCategory,
	deleteCategory,
} = require("../../../services/mongoose/categories");

const index = async (req, res, next) => {
	try {
		const result = await getAllCategories(req);
		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const result = await createCategories(req);
		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const find = async (req, res, next) => {
	try {
		const result = await getOneCategory(req);
		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const result = await updateCategory(req);
		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const destroy = async (req, res, next) => {
	try {
		const result = await deleteCategory(req);
		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	create,
	index,
	find,
	update,
	destroy,
};
