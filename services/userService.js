const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const { makeHashedPassword } = require("../utils/validation");

const signUp = async (
  email,
  password,
  nickname,
  firstName,
  lastName,
  profileImage
) => {
  try {
    const hashedPassword = await makeHashedPassword(password);
    if (!hashedPassword) {
      throw new Error("Password hash failed");
    }

    return await userDao.signUp(
      email,
      hashedPassword,
      nickname,
      firstName,
      lastName,
      profileImage
    );
  } catch (error) {
    throw error;
  }
};

const getUser = async (email) => {
  return await userDao.getUser(email);
};

const login = async (email, password) => {
  try {
    const userInfo = await userDao.getUser(email);
    const pwCheck = await bcrypt.compare(password, userInfo.password);

    if (!pwCheck) {
      throw new Error("Password mismatch");
    }

    const secretKey = process.env.SECRET_KEY;
    const payLoad = { id: userInfo.id };
    const jwtToken = jwt.sign(payLoad, secretKey);
    return {
      JWT: jwtToken,
      userId: userInfo.id,
      userEmail: userInfo.email,
      userNickname: userInfo.nickname,
      userFirstName: userInfo.firstName,
      userLastName: userInfo.lastName,
      userProfileImg: userInfo.profileImage,
    };
  } catch (err) {
    throw new Error("Failed to login");
  }
};

module.exports = {
  signUp,
  getUser,
  login,
};
