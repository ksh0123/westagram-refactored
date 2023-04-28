const fs = require("fs");
const path = require("path");

const postDao = require("../models/postDao");

const addPost = async (userId, imageUrls, content) => {
  try {
    const result = await postDao.addPost(userId, imageUrls, content);
    return result;
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

const getPostById = async (postId) => {
  try {
    const posts = await postDao.getPostById(postId);
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
    const imageUrl = await postDao.getImages(postId);
    const result = await postDao.deletePost(postId);

    if (result.affectedRows >= 0) {
      let files = imageUrl.imageUrl.split(",");
      for (let i = 0; i < files.length; i++) {
        fs.unlinkSync(path.join(process.cwd(), "uploads", files[i]));
      }
    }

    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  editPost,
  deletePost,
};
