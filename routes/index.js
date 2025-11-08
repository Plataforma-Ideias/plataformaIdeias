const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const ideaRoutes = require("./ideaRoutes");
const categoryRoutes = require("./categoryRoutes");

router.get("/", (req, res) => res.redirect("/ideias"));

router.use("/usuarios", userRoutes);
router.use("/ideias", ideaRoutes);
router.use("/categorias", categoryRoutes);

module.exports = router;
