const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createCMSOrgranizer = async (req) => {
	const { name, email, password, confirmPassword, organizer, role } = req.body;

	if (password !== confirmPassword) {
		throw new BadRequestError("password dan confirm password tidak sama");
	}

	const result = await Organizers.create({ name: organizer });
	console.log({
		email,
		name,
		password,
		organizer: result._id,
	});

	const users = await Users.create({
		email,
		name,
		password,
		role,
		organizer: result._id,
	});

	delete users._doc.password;

	return users;
};

const createCMSUser = async (req) => {
	const { name, password, role, confirmPassword, email } = req.body;

	if (password !== confirmPassword) {
		throw new BadRequestError("password dan confirm password tidak sama");
	}

	const result = await Users.create({
		name,
		email,
		organizer: req?.user?.organizer,
		password,
		role,
	});

	return result;
};

module.exports = { createCMSOrgranizer, createCMSUser };
