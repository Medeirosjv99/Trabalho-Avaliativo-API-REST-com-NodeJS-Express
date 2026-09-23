const cursoDao = require("../dao/cursoDao");

let listar = async function (req, res) {

    try {

        const cursos = await cursoDao.listar();

        res.status(200).json(cursos);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao listar cursos",
        });

    }

};

let buscarPorId = async function (req, res) {

    try {

        const id = req.params.id;

        const curso = await cursoDao.buscarPorId(id);

        if (!curso) {

            return res.status(404).json({
                mensagem: "Curso não encontrado",
            });

        }

        res.status(200).json(curso);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar curso",
        });

    }

};

let cadastrar = async function (req, res) {

    try {

        const { nome, cargaHoraria } = req.body || {};

        if (!nome || nome.trim() === "") {

            return res.status(400).json({
                mensagem: "Nome do curso é obrigatório",
            });

        }

        if (!cargaHoraria || cargaHoraria <= 0) {

            return res.status(400).json({
                mensagem: "Carga horária deve ser maior que zero",
            });

        }

        const curso = await cursoDao.cadastrar(nome, cargaHoraria);

        res.status(201).json(curso);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar curso",
        });

    }

};

let alterar = async function (req, res) {

    try {

        const id = req.params.id;

        const { nome, cargaHoraria } = req.body || {};

        if (!nome || nome.trim() === "") {

            return res.status(400).json({
                mensagem: "Nome do curso é obrigatório",
            });

        }

        if (!cargaHoraria || cargaHoraria <= 0) {

            return res.status(400).json({
                mensagem: "Carga horária deve ser maior que zero",
            });

        }

        const curso = await cursoDao.buscarPorId(id);

        if (!curso) {

            return res.status(404).json({
                mensagem: "Curso não encontrado",
            });

        }

        await cursoDao.alterar(id, nome, cargaHoraria);

        res.status(200).json({
            mensagem: "Curso alterado com sucesso",
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao alterar curso",
        });

    }

};

let excluir = async function (req, res) {

    try {

        const id = req.params.id;

        const curso = await cursoDao.buscarPorId(id);

        if (!curso) {

            return res.status(404).json({
                mensagem: "Curso não encontrado",
            });

        }

        await cursoDao.excluir(id);

        res.status(200).json({
            mensagem: "Curso excluído com sucesso",
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir curso",
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