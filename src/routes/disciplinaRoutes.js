const express = require("express");

const disciplinaController = require("../controllers/disciplinaController");

const router = express.Router();

router.get("/disciplinas", disciplinaController.listar);
router.get("/disciplinas/:id", disciplinaController.buscarPorId);
router.post("/disciplinas", disciplinaController.cadastrar);
router.put("/disciplinas/:id", disciplinaController.alterar);
router.delete("/disciplinas/:id", disciplinaController.excluir);

module.exports = router;

const express = require("express");

const disciplinaController = require("../controllers/disciplinaController");

const router = express.Router();

router.get("/disciplinas", disciplinaController.listar);
router.get("/disciplinas/:id", disciplinaController.buscarPorId);
router.post("/disciplinas", disciplinaController.cadastrar);
router.put("/disciplinas/:id", disciplinaController.alterar);
router.delete("/disciplinas/:id", disciplinaController.excluir);

module.exports = router;
