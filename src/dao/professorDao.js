const connection = require("../config/connection");

let listar = async function () {
  const [resultado] = await connection.query("SELECT * FROM professor");

  return resultado;
};

let buscarPorId = async function (id) {
  const [resultado] = await connection.query(
    "SELECT * FROM professor WHERE id = ?",
    [id],
  );

  return resultado[0];
};

let cadastrar = async function (nome, email) {
  const [resultado] = await connection.query(
    `INSERT INTO professor (nome, email)
         VALUES (?, ?)`,
    [nome, email],
  );

  return {
    id: resultado.insertId,
    nome: nome,
    email: email,
  };
};

let alterar = async function (id, nome, email) {
  await connection.query(
    `UPDATE professor
         SET nome = ?, email = ?
         WHERE id = ?`,
    [nome, email, id],
  );
};

let excluir = async function (id) {
  await connection.query("DELETE FROM professor WHERE id = ?", [id]);
};

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  alterar,
  excluir,
};
