const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const categories = [
  { name: "Tecnologia", color: "#1f8ef1" },
  { name: "Educação", color: "#e14eca" },
  { name: "Saúde", color: "#f5365c" },
  { name: "Meio Ambiente", color: "#00f2c3" },
  { name: "Arte e Cultura", color: "#fb6340" },
  { name: "Esportes", color: "#ffd600" },
  { name: "Ciência", color: "#11cdef" },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado ao MongoDB");

    await Category.deleteMany({});

    await Category.insertMany(categories);
    console.log("Categorias adicionadas com sucesso!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Erro ao adicionar categorias:", error);
  }
}

seedCategories();