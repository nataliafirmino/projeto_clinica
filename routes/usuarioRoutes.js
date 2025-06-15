const express = require('express');
const routes = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require("../middlewares/usuarioAuth");

routes.use(auth);
routes.get('/', auth,  usuarioController.relatorio);
routes.post('/', usuarioController.cadastrarPost);
routes.get('/cadastrar/:_id?', usuarioController.cadastrarGet);
routes.post('/login', usuarioController.loginPost);
routes.get('/login', usuarioController.loginGet);
routes.get('/logout', auth, usuarioController.logout);
routes.get('/:_id', auth, usuarioController.detalhar);
routes.get('/remover/:_id', auth, usuarioController.remover);

module.exports = routes;