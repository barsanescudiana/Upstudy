const auth = require("./auth");
const word = require("./word");
const user = require("./user");
const supermemo = require("./supermemo")
const test = require("./test")

const controllers = {
  auth,
  word,
  user,
  supermemo,
  test
};

module.exports = controllers;