const fs = require("fs");
const path = require("path");

const postService = require("../services/postService");
const { catchAsync } = require("../utils/error");

const addPost = catchAsync(async (req, res) => {
  const { content, userId } = req.body;
  const imageFiles = req.files;
  const uploadFiles = fs.readdirSync(path.join(process.cwd(), "uploads"));

  if (!imageFiles) {
    for (const file of imageFiles) {
      if (uploadFiles.includes(file.filename)) {
        fs.unlinkSync(file.path);
      }
      throw new Error("Key error");
    }
  }

  const images = [];
  for (let i = 0; i < imageFiles.length; i++) {
    images.push(imageFiles[i].filename);
  }
  const imageUrls = images.join(",");
  console.log(imageUrls);

  await postService.addPost(userId, uploadFiles, content);
  return res.status(201).json({ message: "Post successfully created!" });
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

  const postExists = postService.getPost(postId);
  if (!postExists) {
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
