const Category = require("../models/Category");

module.exports = {
    async showCategories(req, res) {
        try {
            const categories = await Category.findAll({ raw: true });
            res.render("categories/list", { categories });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao carregar categorias! :(");
        }
    },
};
