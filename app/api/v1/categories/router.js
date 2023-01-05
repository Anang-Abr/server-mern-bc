const router = require("express").Router();
const { create, index, find, update, destroy } = require("./controller");
const {
	authenticateUser,
	authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/", authenticateUser, authorizeRoles("owner", "admin"), index);

router.get("/:id", authenticateUser, find);

router.post("/", authenticateUser, create);

router.put("/:id", authenticateUser, update);

router.delete("/:id", authenticateUser, destroy);

module.exports = router;
