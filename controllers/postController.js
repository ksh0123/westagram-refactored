const fs = require("fs");
const path = require("path");

const postService = require("../services/postService");
const { catchAsync } = require("../utils/error");

const addPost = catchAsync(async (req, res) => {
  const { content, userId } = req.body;
  const imageFiles = req.files;

  if (!imageFiles) {
    for (const file of imageFiles) {
      fs.unlinkSync(file.path);
    }
    throw new Error("Key error");
  }

  const images = [];
  for (let i = 0; i < imageFiles.length; i++) {
    images.push(imageFiles[i].filename);
  }
  const imageUrls = images.join(",");

  const result = await postService.addPost(userId, imageUrls, content);
  return res.status(201).json({ postId: result.insertId });
});

const getPost = catchAsync(async (req, res) => {
  const posts = await postService.getPost();
  return res.status(201).json(posts);
});

const editPost = catchAsync(async (req, res) => {
  const { postId, content } = req.body;
  if (!postId) throw new Error("No ID");

  const postExists = postService.getPost(postId);
  if (!postExists) throw new Error("Post does not exist");

  await postService.editPost(postId, content);
  return res.status(201).json({ message: "Post successfully updated!" });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    throw new Error("No post ID");
  }

  const postExists = await postService.getPostById(postId);
  if (postExists.length <= 0) {
    throw new Error("Post does not exist");
  }

  await postService.deletePost(postId);
  return res.status(201).json({ message: "Post successfully deleted!" });
});

module.exports = {
  addPost,
  getPost,
  editPost,
  deletePost,
};
