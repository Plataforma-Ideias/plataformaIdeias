const Idea = require("../models/Idea");

module.exports = async (req, res, next) => {
    const idea = await Idea.findByPk(req.params.id);
    if (!idea) return res.status(404).send("Ideia não encontrada");
    if (idea.author_id !== req.session.userId) {
        return res
        .status(403)
        .send("Acesso negado! Você não é o autor desta ideia.");
    }
    next();
};
