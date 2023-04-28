const appDataSource = require("./dataSource");

const addPost = async (userId, imageUrls, content) => {
  try {
    const rawQuery = `
    INSERT INTO
      posts
    (user_id, image_url, content)
    VALUES (?, ?, ?);`;

    return await appDataSource.query(rawQuery, [userId, imageUrls, content]);
  } catch (err) {
    throw new Error("Failed to create post");
  }
};

const getPost = async () => {
  try {
    const rawQuery = `
      SELECT
      id,
      user_id as userId,
      image_url as imageUrl,
      content 
      FROM posts;`;

    const posts = await appDataSource.query(rawQuery);

    return posts;
  } catch (err) {
    throw new Error("Failed to signup");
  }
};

const getPostById = async (postId) => {
  try {
    const rawQuery = `
      SELECT
      id,
      user_id as userId,
      image_url as imageUrl,
      content 
      FROM posts
      WHERE id = ?;`;

    const posts = await appDataSource.query(rawQuery, postId);

    return posts;
  } catch (err) {
    throw new Error("Failed to signup");
  }
};

const editPost = async (postId, content) => {
  try {
    const rawQuery = `
      UPDATE posts
      SET
      content = ?
      WHERE id = ?;`;

    return await appDataSource.query(rawQuery, [content, postId]);
  } catch (err) {
    throw new Error("Failed to edit post");
  }
};

const getImages = async (postId) => {
  try {
    const selectRawQuery = `
    SELECT
    image_url as imageUrl
    FROM posts
    WHERE id = ?;`;

    const [imageUrl] = await appDataSource.query(selectRawQuery, postId);
    return imageUrl;
  } catch (err) {
    throw new Error("Failed to delete post");
  }
};

const deletePost = async (postId) => {
  try {
    const deleteRawQuery = `
      DELETE FROM posts
      WHERE id = ?;`;

    return await appDataSource.query(deleteRawQuery, postId);
  } catch (err) {
    throw new Error("Failed to delete post");
  }
};

module.exports = {
  addPost,
  getPost,
  getImages,
  getPostById,
  editPost,
  deletePost,
};
