const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

module.exports = {
  showRegister(req, res) {
    res.render("auth/register");
  },

  showLogin(req, res) {
    res.render("auth/login");
  },

  register: [
    body("name").notEmpty().withMessage("Nome é obrigatório."),
    body("email").isEmail().withMessage("E-mail inválido."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((e) => req.flash("error", e.msg));
        return res.redirect("/auth/register");
      }

      try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          req.flash("error", "E-mail já cadastrado!");
          return res.redirect("/auth/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        await user.save();

        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        req.flash("success", "Conta criada com sucesso!");
        return res.redirect("/ideas");
      } catch (error) {
        console.error(error);
        req.flash("error", "Erro ao cadastrar usuário!");
        return res.redirect("/auth/register");
      }
    },
  ],

  login: [
    body("email").isEmail().withMessage("E-mail inválido."),
    body("password").notEmpty().withMessage("Senha é obrigatória."),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((e) => req.flash("error", e.msg));
        return res.redirect("/auth/login");
      }

      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          req.flash("error", "Usuário não encontrado!");
          return res.redirect("/auth/login");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          req.flash("error", "Senha inválida!");
          return res.redirect("/auth/login");
        }

        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        req.flash("success", `Bem-vindo de volta, ${user.name}!`);
        return res.redirect("/ideas");
      } catch (error) {
        console.error(error);
        req.flash("error", "Erro ao fazer login!");
        return res.redirect("/auth/login");
      }
    },
  ],

  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      req.flash("success", "Logout realizado com sucesso!");
      res.redirect("/auth/login");
    });
  },
};