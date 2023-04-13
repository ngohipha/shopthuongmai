const Blog = require("../models/blogModel");
const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getAllBlog = await Blog.find();

    res.json(getAllBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);

    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { bId } = req.body;
  validateMongoDbId(bId);
  const blog = await Blog.findById(bId);
  const loginUserId = req?.user?._id;
  console
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else if (isLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(updatedBlog);
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { bId } = req.body;
  validateMongoDbId(bId);
  const blog = await Blog.findById(bId);
  const loginUserId = req?.user?._id;
  console
  // find if the user has liked the blog
  const isDisliked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyliked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $pull: { likes: loginUserId },
        isliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else if (isDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      bId, // Fix: Pass blog._id as the first argument
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(updatedBlog);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog
};
