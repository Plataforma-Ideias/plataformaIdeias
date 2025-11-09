const Idea = require("../models/Idea");

function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) return next();
  req.flash("error_msg", "Você precisa estar logado.");
  return res.redirect("/auth/login");
}

async function isAuthor(req, res, next) {
  try {
    const ideaId = req.params.id;
    const idea = await Idea.findById(ideaId).lean();

    if (!idea) {
      req.flash("error_msg", "Ideia não encontrada.");
      return res.redirect("/ideas");
    }

    if (idea.author.toString() !== req.session.userId) {
      req.flash("error_msg", "Você não tem permissão para essa ação.");
      return res.status(403).redirect("/ideas");
    }

    res.locals.idea = idea;
    return next();
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Erro ao verificar permissões.");
    return res.redirect("/ideas");
  }
}

module.exports = { isLoggedIn, isAuthor };