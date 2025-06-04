const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

class UsuarioController {
    static async relatorio(req, res) {
        const status = req.query.s;
        const usuarios = await Usuario.find();
        res.render('usuario/relatorio', { status, usuarios });
    }

    static async cadastrarGet(req, res) {
        const _id = req.params._id;
        let usuario = {};
        if (_id) { //atualização
            usuario = await Usuario.findOne({ _id });
        }
        const status = req.query.s;
        res.render('usuario/cadastrar', { usuario, status });
    }

    static async cadastrarPost(req, res){
        const {
            nome,
            email,
            senha,
            _id
        } = req.body;
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(senha, salt);
        if (_id) {
            await Usuario.updateOne({ _id }, {nome, email, senha: hash});
            res.redirect('/usuarios/cadastrar?s=3');
        } else {
            //cadastro
            const novoUsuario = new Usuario({
                nome: nome,
                email: email,
                senha: hash
            });
            console.log('Dados recebidos:', nome, email);
            await novoUsuario.save();
            
            res.redirect('/usuarios?s=1');
            }
            

    }

    static loginGet(req, res){
        const status = req.query.s;
        if (req.session.usuario){
            res.redirect('/');
            return
        } 
        res.render("usuario/login", {status});
    }

    static async loginPost(req, res){
        const {email, senha} = req.body;
        console.log(email);
        const usuario = await Usuario.findOne({email});
        console.log(usuario);
        if (usuario){ // existe o usuário
            if (bcryptjs.compareSync(senha, usuario.senha)){ // senha válida
                req.session.usuario = usuario.nome;
                res.redirect("/");
            } else{ //senha inválida
                res.redirect("/usuarios/login?s=1");
            }  
        } else{ //e-mail inexistente
            res.redirect("/usuarios/login?s=1");
        }
    }

    static logout(req, res) {
        req.session.usuario = null;
        res.redirect('/usuarios/login');
    }

    static async detalhar(req, res) {
        const _id = req.params._id;
        const usuario = await Usuario.findOne({ _id })
        res.render('usuario/detalhar', { usuario });
    }

    static async remover(req, res) {
        const _id = req.params._id;
        const usuario = await Usuario.deleteOne({ _id });
        res.redirect('/usuarios?s=2');
    }

}
module.exports = UsuarioController;