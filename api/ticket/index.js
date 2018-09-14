const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/", controller.show);
router.post("/", controller.add);
// router.post("/seed", controller.seedData);
router.post("/add",controller.add)
router.put("/update",controller.update)
router.delete("/delete",controller.delete)
router.get("/filter",controller.filterByStatus)

module.exports = router;
