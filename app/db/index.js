const mongoose = require("mongoose");

const { urlDb } = require("../utils/config");

mongoose.set("strictQuery", false);
// mongoose.set("strictPopulate", false);
mongoose.connect(urlDb, () => {
	console.log("database connected");
});

module.exports = mongoose.connection;
