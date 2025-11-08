const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
    showLogin(req, res){
        res.render("auth/login");
    },
    showRegister(req, res){
        res.render("auth/register");
    },
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashed = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashed });
            res.redirect("/login");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao cadastrar usuário! :(");
        }
    },
    async login(req, res) {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email }});

            if (!user) return res.status(400).send("Usuário não encontrado! :P");

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).send("Senha inválida! :P");

            req.session.userId = user.id;
            res.redirect("/ideias");
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao fazer login! :(");
        }
    },
    logout(req, res) {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    },
};

