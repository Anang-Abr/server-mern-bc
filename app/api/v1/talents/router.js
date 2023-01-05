const router = require("express").Router();
const { create, index, find, update, destroy } = require("./controller");

router.get("/", index);

router.get("/:id", find);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
