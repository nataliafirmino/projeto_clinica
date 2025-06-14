const Medico = require("../models/Medico");
const Consulta = require("../models/Consulta");
const Paciente = require("../models/Paciente");

class MedicoController {
    static async relatorio(req, res) {
        const status = req.query.s;
        const medicos = await Medico.find()
        res.render('medico/relatorio', { status, medicos });
    };

    static async cadastrarGet(req, res) {
        const _id = req.params._id;
        let medico = {};
        if (_id) { 
            medico = await Medico.findOne({ _id });
        }
        const status = req.query.s;
        res.render('medico/cadastrar', { medico, status });
    };

    static async cadastrarPost(req, res) {
        const { crm,
            nome,
            uf_crm,
            especialidade,
            telefone,
            email,
            status,
            _id
        } = req.body;
        if (_id) { // atualização
            await Medico.updateOne({ _id }, { crm, nome, uf_crm, especialidade, telefone, email, status })
            res.redirect('/medicos?s=3');

        } else { // cadastro
            const medico = await Medico.findOne({ crm });
            if (medico){
                res.redirect('/medicos/cadastrar?s=1');
            } else{
                const novoMedico = new Medico({
                crm: crm,
                nome: nome,
                uf_crm: uf_crm,
                especialidade: especialidade,
                telefone: telefone,
                email: email,
                status: status
            });
            await novoMedico.save();
            res.redirect('/medicos?s=1');
            }
        }
    };

    static async detalhar(req, res) {
        const _id = req.params._id;
        const medico = await Medico.findOne({ _id })
        res.render('medico/detalhar', { medico });
    };

    static async remover(req, res) {
        const _id = req.params._id;
        const medico = await Medico.findOneAndDelete({ _id });
        await Consulta.deleteMany({ medico: medico._id });
        res.redirect('/medicos?s=2');
    };

}
module.exports = MedicoController;