const express = require('express');

const userRouter = require('./userRouter')
// const postRouter = require('./postRouter')

const routes = express.Router();

routes.use('/users', userRouter);
// routes.use('/posts', postRouter);

module.exports = routes;
