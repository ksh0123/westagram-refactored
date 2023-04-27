const userService = require("../services/userService");

const { catchAsync } = require("../utils/error");
const { checkEmail, checkPassword } = require("../utils/validation");

const signUp = catchAsync(async (req, res) => {
  const { email, password, nickname, firstName, lastName, profileImage } =
    req.body;

  if (!email || !password || !nickname || !firstName || !lastName) {
    throw new Error("Key error");
  }

  if (!checkEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!checkPassword(password)) {
    throw new Error("Invalid password");
  }

  const isDuplicateEmail = await userService.getUser(email);
  if (isDuplicateEmail) {
    throw new Error("Email exists");
  }

  await userService.signUp(
    email,
    password,
    nickname,
    firstName,
    lastName,
    profileImage
  );

  return res.status(201).json({ message: "Signup successful!" });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Key error");
  }

  const result = await userService.login(email, password);
  return res.status(201).json(result);
});

module.exports = {
  signUp,
  login,
};
