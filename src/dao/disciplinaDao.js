const connection = require("../config/connection");

let listar = async function (filtros) {
  let sql = `
        SELECT
            d.id,
            d.nome,
            d.carga_horaria,
            c.nome AS curso,
            p.nome AS professor
        FROM disciplina d
        INNER JOIN curso c ON c.id = d.curso_id
        INNER JOIN professor p ON p.id = d.professor_id
        WHERE 1 = 1
    `;

  let parametros = [];

  if (filtros.curso) {
    sql += " AND d.curso_id = ?";
    parametros.push(filtros.curso);
  }

  if (filtros.professor) {
    sql += " AND d.professor_id = ?";
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
    `
        SELECT
            d.id,
            d.nome,
            d.carga_horaria,
            d.curso_id,
            d.professor_id,
            c.nome AS curso,
            p.nome AS professor
        FROM disciplina d
        INNER JOIN curso c ON c.id = d.curso_id
        INNER JOIN professor p ON p.id = d.professor_id
        WHERE d.id = ?
        `,
    [id]
  );

  return resultado[0];
};

let verificarCurso = async function (curso_id) {
  const [resultado] = await connection.query(
    "SELECT id FROM curso WHERE id = ?",
    [curso_id]
  );

  return resultado[0];
};

let verificarProfessor = async function (professor_id) {
  const [resultado] = await connection.query(
    "SELECT id FROM professor WHERE id = ?",
    [professor_id]
  );

  return resultado[0];
};

let cadastrar = async function (nome, carga_horaria, curso_id, professor_id) {
  const [resultado] = await connection.query(
    `
        INSERT INTO disciplina
        (nome, carga_horaria, curso_id, professor_id)
        VALUES (?, ?, ?, ?)
        `,
    [nome, carga_horaria, curso_id, professor_id]
  );

  return {
    id: resultado.insertId,
    nome: nome,
    carga_horaria: carga_horaria,
    curso_id: curso_id,
    professor_id: professor_id,
  };
};

let alterar = async function (id, nome, carga_horaria, curso_id, professor_id) {
  await connection.query(
    `
        UPDATE disciplina
        SET
            nome = ?,
            carga_horaria = ?,
            curso_id = ?,
            professor_id = ?
        WHERE id = ?
        `,
    [nome, carga_horaria, curso_id, professor_id, id]
  );
};

let excluir = async function (id) {
  await connection.query("DELETE FROM disciplina WHERE id = ?", [id]);
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
