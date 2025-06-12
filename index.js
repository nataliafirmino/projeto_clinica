const express = require('express');
const app = express();
const session = require("express-session");
require('dotenv/config'); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const mongoose= require("mongoose");
mongoose.connect (process.env.MONGO_URI);

app.use(session({
    secret:'ifpe',
    saveUninitialized:false,
    resave: false
}));

const pacienteRoutes = require('./routes/pacienteRoutes');
app.use('/pacientes', pacienteRoutes);

const medicoRoutes = require('./routes/medicoRoutes');
app.use('/medicos', medicoRoutes);

const consultaRoutes = require('./routes/consultaRoutes');
app.use('/consultas', consultaRoutes);

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

app.get('/', function(req, res){
    if (req.session.usuario){
        res.render('index');
    } else{
        res.redirect('/usuarios/login');
    }
});
        
app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log('Servidor iniciado');
});