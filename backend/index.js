require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Importação das rotas
const authRoutes = require("./routes/authRoutes");  // Adicionando as rotas de autenticação
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Criando a instância do app Express
const app = express();
app.use(cors());
app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Definição das rotas da API
app.use("/api/auth", authRoutes);  // Registrando rotas de autenticação
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.send("🚀 API funcionando com sucesso!");
});

// Definição da porta e inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
