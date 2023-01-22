const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");
require("dotenv").config();

const getByEmail = async ({ email }) => {
  return await User.findOne({ where: { email } });
};
const getByPk = async ({ pk }) => {
  return await User.findOne({ where: { pk } });
};
const create = async ({ name, email, password, isAdmin }) => {
  return await User.create({
    name,
    email,
    password,
    isAdmin,
  });
};
const getOrCreate = async ({ name, email, password, isAdmin }) => {
  const alreadyExistingUser = await User.findOne({ where: { email } });
  if (alreadyExistingUser) {
    return getByEmail({ email });
  } else {
    return create({ name, email, password, isAdmin });
  }
};

const generateToken = async ({ user }) => {
  const { pk, name, email, isAdmin } = user;
  const token = jwt.sign({ pk, name, email, isAdmin }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return token;
};

module.exports = {
  getByEmail,
  getByPk,
  create,
  getOrCreate,
  generateToken,
};
