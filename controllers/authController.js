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
        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          req.flash("error", "E-mail já cadastrado!");
          return res.redirect("/auth/register");
        }

        const user = new User({
          name,
          email: normalizedEmail,
          password: password.trim(),
        });

        await user.save();

        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        req.session.save(() => {
          req.flash("success", "Conta criada com sucesso!");
          res.redirect("/ideas");
        });
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
        const normalizedEmail = email.toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          req.flash("error", "Usuário não encontrado!");
          return res.redirect("/auth/login");
        }

        const valid = await user.comparePassword(password.trim());

        if (!valid) {
          req.flash("error", "Senha inválida!");
          return res.redirect("/auth/login");
        }

        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        req.session.save(() => {
          req.flash("success", `Bem-vindo de volta, ${user.name}!`);
          res.redirect("/ideas");
        });
      } catch (error) {
        console.error(error);
        req.flash("error", "Erro ao fazer login!");
        return res.redirect("/auth/login");
      }
    },
  ],

  logout(req, res) {
    req.flash("success", "Logout realizado com sucesso!");
    
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.redirect("/");
      }

      res.clearCookie("connect.sid");
      res.redirect("/auth/login");
    });
  },
};