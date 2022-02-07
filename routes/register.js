const express = require("express");
const router = express.Router();

const { postData } = require("../controllers/register");

router.route("/").post(postData);

module.exports = router;
