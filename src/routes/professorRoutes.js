const express = require("express");

const professorController = require("../controllers/professorController");

const router = express.Router();

router.get("/professores", professorController.listar);
router.get("/professores/:id", professorController.buscarPorId);
router.post("/professores", professorController.cadastrar);
router.put("/professores/:id", professorController.alterar);
router.delete("/professores/:id", professorController.excluir);

module.exports = router;
