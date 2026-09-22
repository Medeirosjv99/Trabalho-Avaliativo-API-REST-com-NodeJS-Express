const express = require("express");

const cursoController = require("../controllers/cursoController");

const router = express.Router();

router.get("/cursos", cursoController.listar);

router.get("/cursos/:id", cursoController.buscarPorId);

router.post("/cursos", cursoController.cadastrar);

router.put("/cursos/:id", cursoController.alterar);

router.delete("/cursos/:id", cursoController.excluir);

module.exports = router;