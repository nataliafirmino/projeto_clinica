const express = require('express');
const routes = express.Router();
const pacienteController = require('../controllers/pacienteController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', auth, pacienteController.relatorio);
routes.post('/', auth, pacienteController.cadastrarPost);
routes.get('/cadastrar/:_id?', auth, pacienteController.cadastrarGet);
routes.get('/:_id', auth, pacienteController.detalhar);
routes.get('/remover/:_id', auth, pacienteController.remover);

module.exports = routes;