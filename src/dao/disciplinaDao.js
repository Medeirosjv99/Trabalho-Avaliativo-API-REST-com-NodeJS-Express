const connection = require("../config/connection");

let listar = async function (filtros) {

  let sql = `SELECT d.id, d.nome, d.cargaHoraria, c.nome AS curso, p.nome AS professor 
  FROM disciplina d 
  INNER JOIN curso c 
  ON c.id = d.curso 
  INNER JOIN professor p 
  ON p.id = d.professor WHERE 1 = 1 `;

  let parametros = [];

  if (filtros.curso) {
    sql += " AND d.curso = ?";
    parametros.push(filtros.curso);
  }

  if (filtros.professor) {
    sql += " AND d.professor = ?";
    parametros.push(filtros.professor);
  }

  if (filtros.nome) {
    sql += " AND d.nome LIKE ?";
    parametros.push(`%${filtros.nome}%`);
  }

  const [resultado] = await connection.query(sql, parametros);

  return resultado;
};

let buscarPorId = async function (id) {

  const [resultado] = await connection.query(
    `SELECT d.id, d.nome, d.cargaHoraria, d.curso, d.professor,
            c.nome AS curso, p.nome AS professor
     FROM disciplina d
     INNER JOIN curso c ON c.id = d.curso
     INNER JOIN professor p ON p.id = d.professor
     WHERE d.id = ?`,
    [id],
  );

  return resultado[0];
};

let verificarCurso = async function (curso) {

  const [resultado] = await connection.query(
    "SELECT id FROM curso WHERE id = ?",
    [curso],
  );

  return resultado[0];
};

let verificarProfessor = async function (professor) {

  const [resultado] = await connection.query(
    "SELECT id FROM professor WHERE id = ?",
    [professor],
  );

  return resultado[0];
};

let cadastrar = async function (nome, cargaHoraria, curso, professor) {

  const [resultado] = await connection.query(
    `INSERT INTO disciplina (nome, cargaHoraria, curso, professor)
     VALUES (?, ?, ?, ?)`,
    [nome, cargaHoraria, curso, professor],
  );

  return {
    id: resultado.insertId,
    nome: nome,
    cargaHoraria: cargaHoraria,
    curso: curso,
    professor: professor,
  };
};

let alterar = async function (id, nome, cargaHoraria, curso, professor) {

  await connection.query(
    `UPDATE disciplina
     SET nome = ?, cargaHoraria = ?, curso = ?, professor = ?
     WHERE id = ?`,
    [nome, cargaHoraria, curso, professor, id],
  );
};

let excluir = async function (id) {

  await connection.query(
    "DELETE FROM disciplina WHERE id = ?",
    [id],
  );
};

module.exports = {
  listar,
  buscarPorId,
  verificarCurso,
  verificarProfessor,
  cadastrar,
  alterar,
  excluir,
};
