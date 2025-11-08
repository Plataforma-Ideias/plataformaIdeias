const Category = require("../models/Category");
const Idea = require("../models/Idea");
const Vote = require("../models/Vote");

module.exports = {
    async showIdeas(req, res) {
        try{
            const ideas = await Idea.findAll({
                inclued: [Category],
                order: [["votesCount", "DESC"]],
                raw: true
            });
            res.render("ideas/list", { ideas });
        } catch (error) {
            console.error(err);
            res.status(500).send("Erro ao carregar ideias! :(");
        }
    },
    async showDetail(req, res) {
        try {
            const { id } = req.params;
            const idea = await Idea.findByPk(id, {
                include: [Category], raw: true
            });
            if (!idea) return res.status(404).send("Ideia não encontrada! :P");
            res.render("ideas/detail", { idea });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao carregar detalhes da ideia! :(");
        }
    },
    createIdea(req, res) {
        res.render("ideas/form", { categories: Category.findAll({ raw: true }) });
    },
    async saveIdea(req, res) {
        try {
            const { title, description, categoryId } = req.body;
            await Idea.create({
                title,
                description,
                categoryId,
                author_id: req.session.userId,
            });
            res.redirect("/ideias");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao salvar ideia! :(");
        }
    },
    async editIdea(req, res) {
        try {
            const { id } = req.params;
            const idea = await Idea.findByPk(id, { raw: true });
            if (!idea) return res.status(404).send("Ideia não encontrada! :P");
            res.render("ideas/form", { idea });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao carregar edição! :(");
        }
    },
    async updateIdea(req, res) {
        try {
            const { id } = req.params;
            await Idea.update(req.body, { where: { id } });
            res.redirect("/ideias");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar ideia! :(");
        }
    },
    async deleteIdea(req, res) {
        try {
            const { id } = req.params;
            await Idea.destroy({ where: { id } });
            res.redirect("/ideias");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar ideia! :(");
        }
    },
    async voteIdea(req, res) {
        try{
            const { id } = req.params;
            const userId = req.session.userId;

            const alreadyVoted = await Vote.findOne({
                where: { userId, ideaId: id }
            });
            if (alreadyVoted) return res.status(400).send("Você já votou nessa ideia! :P");

            await Vote.create({ userId, ideaId: id });
            res.redirect("/ideias");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao votar na ideia! :(");
        }
    }
};