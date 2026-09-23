<<<<<<< HEAD
const express = require("express");

const professorController = require("../controllers/professorController");

const router = express.Router();

router.get("/professores", professorController.listar);
router.get("/professores/:id", professorController.buscarPorId);
router.post("/professores", professorController.cadastrar);
router.put("/professores/:id", professorController.alterar);
router.delete("/professores/:id", professorController.excluir);

module.exports = router;
=======
const express = require("express");

const professorController = require("../controllers/professorController");

const router = express.Router();

router.get("/professores", professorController.listar);
router.get("/professores/:id", professorController.buscarPorId);
router.post("/professores", professorController.cadastrar);
router.put("/professores/:id", professorController.alterar);
router.delete("/professores/:id", professorController.excluir);

module.exports = router;
>>>>>>> fcace83a0a2f7085f74c9db53d521e1a836a282e
