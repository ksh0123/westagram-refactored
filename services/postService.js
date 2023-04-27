const fs = require("fs");
const path = require("path");

const postDao = require("../models/postDao");

const addPost = async (userId, uploadFiles, content) => {
  try {
    const imageUrl = uploadFiles.join(",");
    console.log(imageUrl);
    return await postDao.addPost(userId, imageUrl, content);
  } catch (error) {
    throw error;
  }
};

const getPost = async () => {
  try {
    const posts = await postDao.getPost();
    return posts;
  } catch (error) {
    throw error;
  }
};

const editPost = async (postId, content) => {
  try {
    await postDao.editPost(postId, content);
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const images = await postDao.deletePost(postId);
    images = images.split(",");

    const imageFiles = fs.readdirSync(path.join(process.cwd(), "uploads"));
    for (let i = 0; i < images.length; i++) {
      if (imageFiles.includes(images[i])) fs.unlinkSync(images[i]);
    }

    if (imageFiles.includes(file.filename)) {
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPost,
  getPost,
  editPost,
  deletePost,
};
