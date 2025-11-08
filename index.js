require("dotenv").config();
require("express-async-errors");

const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessões
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecreto",
        resave: false,
        saveUninitialized: false,
    })
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars"); 
app.set("views", path.join(__dirname, "views"));

app.use(routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Erro interno no servidor! :(");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} :)`));
