const Idea = require("../models/Idea");

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user && req.session.user._id) {
    return next();
  }
  req.flash("error", "Você precisa estar logado.");
  return res.redirect("/auth/login");
}

async function isAuthor(req, res, next) {
  try {
    const ideaId = req.params.id;
    const idea = await Idea.findById(ideaId).lean();

    if (!idea) {
      req.flash("error", "Ideia não encontrada.");
      return res.redirect("/ideas");
    }

    if (!req.session.user || idea.author.toString() !== req.session.user._id) {
      req.flash("error", "Você não tem permissão para essa ação.");
      return res.status(403).redirect("/ideas");
    }

    res.locals.idea = idea;
    return next();
  } catch (error) {
    console.error(error);
    req.flash("error", "Erro ao verificar permissões.");
    return res.redirect("/ideas");
  }
}

module.exports = { isLoggedIn, isAuthor };