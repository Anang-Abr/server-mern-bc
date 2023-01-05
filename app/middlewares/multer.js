const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

function fileFilter(req, file, cb) {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg"
	) {
		cb(null, true);
	} else {
		cb({ message: "unsuported file format" }, false);
	}
	// You can always pass an error if something goes wrong:
	// cb(new Error("I don't have a clue!"));
}

module.exports = multer({
	storage,
	limits: {
		fieldSize: 3000000,
	},
	fileFilter,
});
