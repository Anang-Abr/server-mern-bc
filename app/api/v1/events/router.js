const { index, create, update, find, destroy } = require("./controller");

const router = require("express").Router();

router.get("/", index);
router.get("/:id", find);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
