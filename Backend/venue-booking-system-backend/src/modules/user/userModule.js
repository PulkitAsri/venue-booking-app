const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");
require("dotenv").config();

const getUserByEmail = async ({ email }) => {
  return await User.findOne({ where: { email } });
};
const getUserByPk = async ({ pk }) => {
  return await User.findOne({ where: { pk } });
};
const createUser = async ({ name, email, password, isAdmin }) => {
  return await User.create({
    name,
    email,
    password,
    isAdmin,
  });
};
const getOrCreateUser = async ({ name, email, password, isAdmin }) => {
  const alreadyExistingUser = await User.findOne({ where: { email } });
  if (alreadyExistingUser) {
    return getUserByEmail({ email });
  } else {
    return createUser({ name, email, password, isAdmin });
  }
};

const generateToken = async ({ user }) => {
  const { pk, name, email, isAdmin } = user;
  const token = jwt.sign({ pk, name, email, isAdmin }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  getUserByEmail,
  getUserByPk,
  createUser,
  getOrCreateUser,
  generateToken,
};
