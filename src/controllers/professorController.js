const professorDao = require("../dao/professorDao");

let listar = async function (req, res) {
  try {
    const professores = await professorDao.listar();

    res.status(200).json(professores);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao listar professores",
    });
  }
};

let buscarPorId = async function (req, res) {
  try {
    const id = req.params.id;

    const professor = await professorDao.buscarPorId(id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    res.status(200).json(professor);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao buscar professor",
    });
  }
};

let cadastrar = async function (req, res) {
  try {
    const { nome, email } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "Nome do professor é obrigatório",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        mensagem: "Email do professor é obrigatório",
      });
    }

    const professor = await professorDao.cadastrar(nome, email);

    res.status(201).json(professor);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar professor",
    });
  }
};

let alterar = async function (req, res) {
  try {
    const id = req.params.id;
    const { nome, email } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        mensagem: "Nome do professor é obrigatório",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        mensagem: "Email do professor é obrigatório",
      });
    }

    const professor = await professorDao.buscarPorId(id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await professorDao.alterar(id, nome, email);

    res.status(200).json({
      mensagem: "Professor alterado com sucesso",
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao alterar professor",
    });
  }
};

let excluir = async function (req, res) {
  try {
    const id = req.params.id;

    const professor = await professorDao.buscarPorId(id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await professorDao.excluir(id);

    res.status(200).json({
      mensagem: "Professor excluído com sucesso",
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      mensagem: "Erro ao excluir professor",
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
