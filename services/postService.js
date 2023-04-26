const postDao = require('../models/postDao')

const addPost = async (userId, imageUrl, content) => {
    try{
    return await postDao.addPost(userId, imageUrl, content)
      } catch (error) {
          throw error
      }
  }

const getPost = async () => {
  try{
  const posts = await postDao.getPost()
  return posts
    } catch (error) {
        throw error
    }
}

const editPost = async (postId, imageUrl, content) => {
    try{
    return await postDao.editPost(postId, imageUrl, content)
      } catch (error) {
          throw error
      }
  }

  const deletePost = async (postId) => {
    try{
    return await postDao.deletePost(postId)
      } catch (error) {
          throw error
      }
  }

module.exports = {
  addPost,
  getPost,
  editPost,
  deletePost
}