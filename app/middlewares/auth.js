const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { validateToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
	try {
		let token;
		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith("Bearer ")) {
			token = authHeader.split(" ")[1];
		}

		if (!token) throw new UnauthenticatedError("Authentication invalid");
		const payload = validateToken({ token });

		req.user = {
			email: payload.email,
			role: payload.role,
			name: payload.name,
			organizer: payload.organizer,
			id: payload.userId,
		};
		next();
	} catch (error) {
		next(error);
	}
};

const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			throw new UnauthorizedError("Unauthorized User!");
		next();
	};
};

module.exports = { authenticateUser, authorizeRoles };
