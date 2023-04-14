const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImages,  } = require('../controller/blogCtrl');
const { uploadPhoto, blogImgResize } = require('../middlewares/upload');
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/likes',authMiddleware,likeBlog)
router.put('/dislikes',authMiddleware,dislikeBlog)

router.get('/',getAllBlogs)

router.put("/upload/:id",[authMiddleware , isAdmin], uploadPhoto.array('images',2),blogImgResize,uploadImages);

router.put('/:id',authMiddleware,isAdmin,updateBlog)
router.get('/:id',getBlog)
router.delete('/:id',authMiddleware,isAdmin,deleteBlog)




module.exports = router;