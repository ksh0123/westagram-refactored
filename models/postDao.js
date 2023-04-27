const appDataSource = require("./dataSource");

const addPost = async (userId, imageUrl, content) => {
  try {
    const rawQuery = `
    INSERT INTO
      posts
    (user_id, image_url, content)
    VALUES (?, ?, ?);`;

    await appDataSource.query(rawQuery, [userId, imageUrl, content]);

    return;
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

const deletePost = async (postId) => {
  try {
    const selectRawQuery = `
    SELECT
    image_url as imageUrl,
    FROM posts
    WHERE id = ?;`;

    const images = await appDataSource.query(selectRawQuery, postId);

    const deleteRawQuery = `
      DELETE FROM posts
      WHERE id = ?;`;

    await appDataSource.query(deleteRawQuery, postId);

    return images;
  } catch (err) {
    throw new Error("Failed to delete post");
  }
};

module.exports = {
  addPost,
  getPost,
  editPost,
  deletePost,
};
