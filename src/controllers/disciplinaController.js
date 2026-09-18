const disciplinaDao = require("../dao/disciplinaDao");

let listar = async function (req, res) {
  try {
    const disciplinas = await disciplinaDao.listar(req.query);

    res.status(200).json(disciplinas);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao listar disciplinas",
    });
  }
};

let buscarPorId = async function (req, res) {
  try {
    const id = req.params.id;

    const disciplina = await disciplinaDao.buscarPorId(id);

    if (!disciplina) {
      return res.status(404).json({
        mensagem: "Disciplina não encontrada",
      });
    }

    res.status(200).json(disciplina);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao buscar disciplina",
    });
  }
};

let cadastrar = async function (req, res) {
  try {
    const { nome, carga_horaria, curso_id, professor_id } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "Nome da disciplina é obrigatório",
      });
    }

    if (!carga_horaria || carga_horaria <= 0) {
      return res.status(400).json({
        mensagem: "Carga horária deve ser maior que zero",
      });
    }

    if (!curso_id) {
      return res.status(400).json({
        mensagem: "Curso é obrigatório",
      });
    }

    if (!professor_id) {
      return res.status(400).json({
        mensagem: "Professor é obrigatório",
      });
    }

    const curso = await disciplinaDao.verificarCurso(curso_id);

    if (!curso) {
      return res.status(404).json({
        mensagem: "Curso não encontrado",
      });
    }

    const professor = await disciplinaDao.verificarProfessor(professor_id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    const disciplina = await disciplinaDao.cadastrar(
      nome,
      carga_horaria,
      curso_id,
      professor_id
    );

    res.status(201).json(disciplina);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar disciplina",
    });
  }
};

let alterar = async function (req, res) {
  try {
    const id = req.params.id;

    const { nome, carga_horaria, curso_id, professor_id } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "Nome da disciplina é obrigatório",
      });
    }

    if (!carga_horaria || carga_horaria <= 0) {
      return res.status(400).json({
        mensagem: "Carga horária deve ser maior que zero",
      });
    }

    if (!curso_id) {
      return res.status(400).json({
        mensagem: "Curso é obrigatório",
      });
    }

    if (!professor_id) {
      return res.status(400).json({
        mensagem: "Professor é obrigatório",
      });
    }

    const disciplina = await disciplinaDao.buscarPorId(id);

    if (!disciplina) {
      return res.status(404).json({
        mensagem: "Disciplina não encontrada",
      });
    }

    const curso = await disciplinaDao.verificarCurso(curso_id);

    if (!curso) {
      return res.status(404).json({
        mensagem: "Curso não encontrado",
      });
    }

    const professor = await disciplinaDao.verificarProfessor(professor_id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await disciplinaDao.alterar(
      id,
      nome,
      carga_horaria,
      curso_id,
      professor_id
    );

    res.status(200).json({
      mensagem: "Disciplina alterada com sucesso",
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao alterar disciplina",
    });
  }
};

let excluir = async function (req, res) {
  try {
    const id = req.params.id;

    const disciplina = await disciplinaDao.buscarPorId(id);

    if (!disciplina) {
      return res.status(404).json({
        mensagem: "Disciplina não encontrada",
      });
    }

    await disciplinaDao.excluir(id);

    res.status(200).json({
      mensagem: "Disciplina excluída com sucesso",
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao excluir disciplina",
    });
  }
};

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  alterar,
  excluir,
};
