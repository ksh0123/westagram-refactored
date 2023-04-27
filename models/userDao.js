const appDataSource = require("./dataSource");

const signUp = async (
  email,
  hashedPassword,
  nickname,
  firstName,
  lastName,
  profileImage
) => {
  try {
    const rawQuery = `
    INSERT INTO
      users
    (email, password, nickname, first_name, last_name, profile_image)
    VALUES (?, ?, ?, ?, ?, ?);`;

    await appDataSource.query(rawQuery, [
      email,
      hashedPassword,
      nickname,
      firstName,
      lastName,
      profileImage,
    ]);

    return;
  } catch (err) {
    throw new Error("Failed to signup");
  }
};

const getUser = async (email) => {
  const rawQuery = `
    SELECT
      id,
      email,
      password,
      nickname,
      first_name as firstName,
      last_name as lastName,
      profile_image as profileImage
    FROM users WHERE email = ?;`;

  const [result] = await appDataSource.query(rawQuery, [email]);
  return result;
};

module.exports = {
  signUp,
  getUser,
};
