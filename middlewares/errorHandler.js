function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === "EBADCSRFTOKEN") {
    req.flash("error_msg", "Formulário inválido (falha de segurança CSRF).");
    return res.redirect("back");
  }

  req.flash("error_msg", "Ocorreu um erro interno no servidor.");
  
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).render("error", { 
    title: "Erro interno", 
    message: err.message || "Algo deu errado, tente novamente mais tarde."
  });
}

module.exports = { errorHandler };