const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { isLoggedIn, isAuthor } = require("../middlewares/auth");

router.get("/", ideaController.showIdeas);

router.get("/new", isLoggedIn, ideaController.createIdea);
router.post("/", isLoggedIn, ideaController.saveIdea);

router.get("/:id", ideaController.showDetail);

router.get("/:id/edit", isLoggedIn, isAuthor, ideaController.editIdea);
router.put("/:id/edit", isLoggedIn, isAuthor, ideaController.updateIdea);

router.delete("/:id/delete", isLoggedIn, isAuthor, ideaController.deleteIdea);

router.post("/:id/vote", isLoggedIn, ideaController.voteIdea);

module.exports = router;