const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAuthor = require("../middlewares/isAuthor");

router.get("/", ideaController.showIdeas);

router.get("/nova", isLoggedIn, ideaController.createIdea);
router.post("/", isLoggedIn, ideaController.saveIdea);

router.get("/:id", ideaController.showDetail)

router.get("/:id/editar", isLoggedIn, isAuthor, ideaController.editIdea);
router.put("/:id/editar", isLoggedIn, isAuthor, ideaController.updateIdea);

router.delete("/:id/deletar", isLoggedIn, isAuthor, ideaController.deleteIdea);

router.get("/:id/votar", isLoggedIn, ideaController.voteIdea);

module.exports = router;