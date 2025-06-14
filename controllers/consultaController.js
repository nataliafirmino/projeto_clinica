const Paciente = require("../models/Paciente");
const Medico = require("../models/Medico");
const Consulta = require("../models/Consulta");

class ConsultaController {
    static async relatorio(req, res) {
        const status = req.query.s;
        const consultas = await Consulta.find()
            .populate('paciente')
            .populate('medico')
        res.render('consulta/relatorio', { status, consultas });
    };

    static async agendarPost(req, res) {
        const {
            cod,
            paciente,
            medico,
            dataConsulta,
            valor,
            _id
        } = req.body;
        if (_id) { //atualização
            await Consulta.updateOne({ _id }, {cod, paciente, medico, dataConsulta, valor})
            res.redirect('/consultas?s=3');
        
        } else { //agendamento
            const consulta = await Consulta.findOne({cod});
            if (consulta){
                res.redirect('/consultas/agendar?s=1');
            } else{
                const novaConsulta = new Consulta({
                cod: cod,
                paciente: paciente,
                medico: medico,
                dataConsulta: dataConsulta,
                valor: valor,
                status: "Agendado"
            });
            await novaConsulta.save();
            res.redirect('/consultas?s=1');
            }
        }   
    };

    static async agendarGet(req, res) {
        const _id = req.params._id;
        let consulta = {};
        if (_id) { 
            consulta = await Consulta.findOne({ _id });
        }
        const status = req.query.s;
        const pacientes = await Paciente.find();
        const medicos = await Medico.find({ status: 'Ativo' });
        res.render('consulta/agendar', { consulta, pacientes, medicos, status });
    };

    static async detalhar(req, res) {
        const _id = req.params._id;
        const consulta = await Consulta.findOne({ _id })
            .populate('paciente')
            .populate('medico')
        res.render('consulta/detalhar', { consulta });
    };

    static async remover(req, res) {
        const _id = req.params._id;
        const consulta = await Consulta.findOneAndDelete({_id})
        res.redirect('/consultas?s=2');
    };

}
module.exports = ConsultaController;