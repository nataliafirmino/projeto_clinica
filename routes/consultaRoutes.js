const express = require('express');
const routes = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', auth, consultaController.relatorio);
routes.post('/', consultaController.agendarPost);
routes.get('/agendar/:_id?', auth, consultaController.agendarGet);
routes.get('/:_id', auth, consultaController.detalhar);
routes.get('/remover/:_id', auth,  consultaController.remover);

module.exports = routes;