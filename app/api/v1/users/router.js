const { createOrganizer, createUser } = require("./controller");

const router = require("express").Router();

const { authenticateUser } = require("../../../middlewares/auth");

router.get("/users", (req, res) => {
	res.json({
		data: "test",
	});
});
// router.use(authenticateUser);
router.post("/users", authenticateUser, createOrganizer);
router.post("/admin", authenticateUser, createUser);

module.exports = router;
