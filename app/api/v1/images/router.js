const router = require("express").Router();
const upload = require("../../../middlewares/multer");
const { create, index } = require("./controller");

router.get("/", index);

router.post("/", upload.single("avatar"), create);

module.exports = router;
