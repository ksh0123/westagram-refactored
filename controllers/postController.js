const postService = require('../services/postService')

const { catchAsync } = require('../utils/error')

const addPost = catchAsync(async (req, res) => {
  const {userId, imageUrl, content} = req.body
  if (!userId || !imageUrl) {
    throw new Error('Key error')
  }

  await postService.addPost(userId, imageUrl, content)
  return res.status(201).json({ message: 'Post successfully created!' })
})

const getPost = catchAsync(async (req, res) => {
   const posts = await postService.getPost()
    return res.status(201).json(posts)
  })

const editPost = catchAsync(async (req, res) => {
    const {postId, imageUrl, content} = req.body
    if (!postId) {
        throw new Error('No ID')
    }

    const postExists = postService.getPost(postId)
    if (!postExists) {
      throw new Error('Post does not exist')
    }

    await postService.editPost(postId, imageUrl, content)
    return res.status(201).json({ message: 'Post successfully updated!' })
})

const deletePost = catchAsync(async (req, res) => {
    const { postId } = req.body
    if (!postId) {
        throw new Error('No post ID')
    }

    const postExists = postService.getPost(postId)
    if (!postExists) {
      throw new Error('Post does not exist')
    }

    await postService.deletePost(postId)
    return res.status(201).json({ message: 'Post successfully deleted!' })
  })


module.exports = {
    addPost,
    getPost,
    editPost,
    deletePost
}
