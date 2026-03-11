const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const  verifyToken  = require("../middleware/auth.middleware");

router.post("/", productController.addProduct);
router.get("/", productController.getProducts);
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;
