const express = require("express");

const connection = require("./config/connection");

const cursoRoutes = require("./routes/cursoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const disciplinaRoutes = require("./routes/disciplinaRoutes");

const app = express();

app.use(express.json());

app.use(cursoRoutes);
app.use(professorRoutes);
app.use(disciplinaRoutes);

const PORT = 3000;

connection
  .getConnection()
  .then((conexao) => {
    console.log("Banco de dados conectado!");
    conexao.release();
  })
  .catch((erro) => {
    console.log("Erro ao conectar no banco:", erro.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
