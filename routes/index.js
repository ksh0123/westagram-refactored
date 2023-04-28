const express = require("express");
const path = require("path");

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

const routes = express.Router();

routes.use("/post/", express.static(path.join(process.cwd(), "uploads")));
routes.use("/img/", express.static(path.join(process.cwd(), "profiles")));
routes.use("/users", userRouter);
routes.use("/posts", postRouter);

module.exports = routes;
