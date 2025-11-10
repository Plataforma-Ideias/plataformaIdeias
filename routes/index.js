const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/ideaController");
const { isLoggedIn } = require("../middlewares/auth");

router.use("/auth", require("./auth"));
router.use("/categories", require("./category"));
router.use("/ideas", require("./ideas"));

router.get("/", ideaController.home);

router.get("/profile", isLoggedIn, ideaController.profile);

module.exports = router;
