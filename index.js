require("dotenv").config();
require("express-async-errors");

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const morgan = require("morgan");
const methodOverride = require("method-override");

const connectDB = require("./db/conn");

const app = express();

connectDB();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecreto",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    eq: (a, b) => String(a) === String(b),
    formatDate: (d) =>
      new Date(d).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(csurf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));

const { errorHandler } = require("./middlewares/errorHandler");
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Erro interno no servidor! :(");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);