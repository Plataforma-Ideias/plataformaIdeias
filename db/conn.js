require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão feita com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

module.exports = connectDB;