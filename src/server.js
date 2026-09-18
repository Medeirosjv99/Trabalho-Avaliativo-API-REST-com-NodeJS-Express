const express = require('express');
const connection = require('./config/connection');

const app = express();

app.use(express.json());

const PORT = 3000;

connection.getConnection()
    .then(() => {
        console.log('Banco de dados conectado!');
    })
    .catch((erro) => {
        console.log('Erro ao conectar no banco:', erro.message);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});