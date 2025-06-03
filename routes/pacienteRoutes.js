const express = require('express');
const routes = express.Router();
const pacienteController = require('../controllers/pacienteController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', pacienteController.relatorio);
routes.post('/', pacienteController.cadastrarPost);
routes.get('/cadastrar/:_id?', pacienteController.cadastrarGet);
routes.get('/:_id', pacienteController.detalhar);
routes.get('/remover/:_id', pacienteController.remover);

module.exports = routes;