const category = require("../controller/category.controller");
const express = require("express");

const router = express.Router();

router.post("/category",category.create);
router.get("/category",category.findAll);
router.get("/category/:id",category.findOne);
router.put("/category/:id",category.update);
router.delete("/category/:id",category.delete);

module.exports = router;