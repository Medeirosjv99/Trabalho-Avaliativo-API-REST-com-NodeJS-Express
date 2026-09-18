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

let cadastrar = async function (nome, carga_horaria) {
  const [resultado] = await connection.query(
    `INSERT INTO curso (nome, carga_horaria)
         VALUES (?, ?)`,
    [nome, carga_horaria]
  );

  return {
    id: resultado.insertId,
    nome: nome,
    carga_horaria: carga_horaria,
  };
};

let alterar = async function (id, nome, carga_horaria) {
  await connection.query(
    `UPDATE curso
         SET nome = ?, carga_horaria = ?
         WHERE id = ?`,
    [nome, carga_horaria, id]
  );
};

let excluir = async function (id) {
  await connection.query("DELETE FROM curso WHERE id = ?", [id]);
};

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  alterar,
  excluir,
};
