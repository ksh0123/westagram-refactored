const express = require('express');
const { validateToken } = require('../middlewares/auth')


const postController = require('../controllers/postController');

const router = express.Router();

router.post('/new', validateToken, postController.addPost)
router.get('', validateToken, postController.getPost)
router.put('/edits', validateToken, postController.editPost)
router.delete('', validateToken, postController.deletePost)

module.exports = router;