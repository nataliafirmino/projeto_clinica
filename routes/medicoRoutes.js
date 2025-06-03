const express = require('express');
const routes = express.Router();
const medicoController = require('../controllers/medicoController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', medicoController.relatorio);
routes.post('/', medicoController.cadastrarPost);
routes.get('/cadastrar/:_id?', medicoController.cadastrarGet);
routes.get('/:_id', medicoController.detalhar);
routes.get('/remover/:_id', medicoController.remover);

module.exports = routes;