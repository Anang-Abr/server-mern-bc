const { signInCms } = require("./controller");
const router = require("express").Router();
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/auth/signin", signInCms);

module.exports = router;
