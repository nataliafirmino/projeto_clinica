const express = require('express');
const routes = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', consultaController.relatorio);
routes.post('/', consultaController.agendarPost);
routes.get('/agendar/:_id?', consultaController.agendarGet);
routes.get('/:_id', consultaController.detalhar);
routes.get('/remover/:_id', consultaController.remover);

module.exports = routes;