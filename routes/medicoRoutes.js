const express = require('express');
const routes = express.Router();
const medicoController = require('../controllers/medicoController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', auth, medicoController.relatorio);
routes.post('/', medicoController.cadastrarPost);
routes.get('/cadastrar/:_id?',auth,  medicoController.cadastrarGet);
routes.get('/:_id', auth, medicoController.detalhar);
routes.get('/remover/:_id', auth, medicoController.remover);

module.exports = routes;