const connection = require("../config/connection");

let listar = async function () {

    const [resultado] = await connection.query("SELECT * FROM curso");

    return resultado;
};

let buscarPorId = async function (id) {

    const [resultado] = await connection.query(
        "SELECT * FROM curso WHERE id = ?",
        [id]
    );

    return resultado[0];
};

let cadastrar = async function (nome, cargaHoraria) {

    const [resultado] = await connection.query(
        `INSERT INTO curso (nome, cargaHoraria) VALUES (?, ?)`,
        [nome, cargaHoraria]
    );

    return {
        id: resultado.insertId,
        nome: nome,
        cargaHoraria: cargaHoraria
    };
};

let alterar = async function (id, nome, cargaHoraria) {

    await connection.query(
        `UPDATE curso SET nome = ?, cargaHoraria = ? WHERE id = ?`,
        [nome, cargaHoraria, id]
    );

};

let excluir = async function (id) {

    await connection.query(
        "DELETE FROM curso WHERE id = ?",
        [id]
    );

};

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    alterar,
    excluir
};