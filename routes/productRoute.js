const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  ratting,
  uploadImages,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/upload");
const router = express.Router();

router.post("/",[authMiddleware , isAdmin], createProduct);
router.put("/wishlist",authMiddleware , addToWishlist);
router.put("/rating",authMiddleware , ratting);




router.put("/upload/:id",[authMiddleware , isAdmin], uploadPhoto.array('images',10),productImgResize,uploadImages);

router.get("/:id", getaProduct);
router.put("/:id",[authMiddleware , isAdmin], updateProduct);
router.delete("/:id",[authMiddleware , isAdmin],deleteProduct);

router.get("/", getAllProducts);

module.exports = router;
