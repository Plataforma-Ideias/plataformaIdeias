const Category = require("../models/Category");
const Idea = require("../models/Idea");

module.exports = {
  async home(req, res) {
    try {
      const ideas = await Idea.find()
        .populate("category")
        .sort({ votesCount: -1 })
        .limit(6)
        .lean();

      res.render("index", {
        ideas,
        currentUser: req.session.user,
        title: "Início - Plataforma de Ideias",
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar ideias!");
      res.redirect("/ideas");
    }
  },

  async showIdeas(req, res) {
    try {
      const ideas = await Idea.find()
        .populate("category")
        .sort({ votesCount: -1 })
        .lean();

      res.render("ideas/list", {
        ideas,
        currentUser: req.session.user,
        title: "Todas as Ideias",
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar ideias!");
      res.redirect("/");
    }
  },

  async showDetail(req, res) {
    try {
      const { id } = req.params;
      const idea = await Idea.findById(id).populate("author").lean();
      if (!idea) {
        req.flash("error", "Ideia não encontrada!");
        return res.redirect("/ideas");
      }

      let userVoted = false;
      if (req.session.user) {
        userVoted = idea.voters?.some(
          (voterId) => voterId.toString() === req.session.user._id.toString()
        );
      }

      res.render("ideas/detail", {
        idea,
        userVoted,
        csrfToken: req.csrfToken(),
        currentUser: req.session.user,
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar detalhes da ideia!");
      res.redirect("/ideas");
    }
  },

  async createIdea(req, res) {
    try {
      const categories = await Category.find().lean();
      res.render("ideas/form", { categories, currentUser: req.session.user });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar formulário de ideia!");
      res.redirect("/ideas");
    }
  },

  async saveIdea(req, res) {
    try {
      const { title, description, categoryId } = req.body;

      const idea = new Idea({
        title,
        description,
        category: categoryId,
        author: req.session.user._id,
      });

      await idea.save();
      req.flash("success", "Ideia criada com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao salvar ideia!");
      res.redirect("/ideas");
    }
  },

  async editIdea(req, res) {
    try {
      const { id } = req.params;
      const idea = await Idea.findById(id).lean();

      if (!idea) {
        req.flash("error", "Ideia não encontrada!");
        return res.redirect("/ideas");
      }

      const categories = await Category.find().lean();
      res.render("ideas/form", { idea, categories, currentUser: req.session.user });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar edição da ideia!");
      res.redirect("/ideas");
    }
  },

  async updateIdea(req, res) {
    try {
      const { id } = req.params;
      const { title, description, categoryId } = req.body;

      await Idea.findByIdAndUpdate(id, {
        title,
        description,
        category: categoryId,
      });

      req.flash("success", "Ideia atualizada com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao atualizar ideia!");
      res.redirect("/ideas");
    }
  },

  async deleteIdea(req, res) {
    try {
      const { id } = req.params;
      await Idea.findByIdAndDelete(id);

      req.flash("success", "Ideia deletada com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao deletar ideia!");
      res.redirect("/ideas");
    }
  },

  async voteIdea(req, res) {
    try {
      const { id } = req.params;
      const userId = req.session.user._id;

      const idea = await Idea.findById(id);
      if (!idea) {
        req.flash("error", "Ideia não encontrada!");
        return res.redirect("/ideas");
      }

      if (idea.voters && idea.voters.includes(userId)) {
        req.flash("error", "Você já votou nessa ideia!");
        return res.redirect("/ideas");
      }

      idea.votesCount = (idea.votesCount || 0) + 1;
      idea.voters = idea.voters ? [...idea.voters, userId] : [userId];

      await idea.save();

      req.flash("success", "Voto registrado com sucesso!");
      res.redirect("/ideas");
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao votar na ideia!");
      res.redirect("/ideas");
    }
  },

  async profile(req, res) {
    try {
      const userId = req.session.user._id;
      const ideas = await Idea.find({ author: userId })
        .populate("category")
        .sort({ createdAt: -1 })
        .lean();

      res.render("profile", {
        ideas,
        user: req.session.user,
        currentUser: req.session.user,
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "Erro ao carregar seu perfil!");
      res.redirect("/");
    }
  },
};