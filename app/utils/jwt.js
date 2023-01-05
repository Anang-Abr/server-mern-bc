const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config");

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, jwtSecret, {
		expiresIn: jwtExpiration,
	});
	return token;
};

const validateToken = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
	createJWT,
	validateToken,
};
