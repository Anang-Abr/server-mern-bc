const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createUserToken } = require("../../utils");

const signIn = async (req) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const result = await Users.findOne({ email });

	if (!result) {
		throw new UnauthorizedError("Invalid credentials");
	}

	const isPasswordCorrect = await result.comparePassword(password);
	console.log("password");
	console.log(isPasswordCorrect);

	if (!isPasswordCorrect) {
		throw new UnauthorizedError("Invalid credentials");
	}

	const token = createJWT({ payload: createUserToken(result) });

	return token;
};

module.exports = { signIn };
