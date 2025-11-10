const Category = require("../models/Category");

module.exports = {
  async showCategories(req, res) {
    try {
      const categories = await Category.find().lean();

      res.render("categories/list", { categories });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar categorias!");
      res.redirect("/");
    }
  },
};
