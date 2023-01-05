const {
	createCMSOrgranizer,
	createCMSUser,
} = require("../../../services/mongoose/users");
const { StatusCodes } = require("http-status-codes");

const createOrganizer = async (req, res, next) => {
	try {
		const result = await createCMSOrgranizer(req);

		res.status(StatusCodes.CREATED).send({ data: result });
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const result = await createCMSUser(req);
		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { createOrganizer, createUser };
