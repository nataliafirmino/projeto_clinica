const Paciente = require("../models/Paciente");
const Consulta = require("../models/Consulta");

class PacienteController {
    static async relatorio(req, res) {
        const status = req.query.s;
        const pacientes = await Paciente.find();
        res.render('paciente/relatorio', { status, pacientes });
    };

    static async cadastrarGet(req, res) {
        const _id = req.params._id;
        let paciente = {};
        if (_id) { 
            paciente = await Paciente.findOne({ _id });
        }
        const status = req.query.s;
        res.render('paciente/cadastrar', { paciente, status });
    };

    static async cadastrarPost(req, res) {
        const { cpf,
            nome,
            dataNascimento,
            telefone,
            logradouro,
            numResidencia,
            bairro,
            cidade,
            estado,
            _id
        } = req.body;
        if (_id) { //atualização
            await Paciente.updateOne({ _id }, { cpf, nome, dataNascimento, telefone, logradouro, numResidencia, bairro, cidade, estado })
            res.redirect('/pacientes?s=3');
        } else { //cadastro
            const paciente = await Paciente.findOne({cpf});
            if (paciente){
                res.redirect('/pacientes/cadastrar?s=1');
            } else{
                const novoPaciente = new Paciente({
                cpf: cpf,
                nome: nome,
                dataNascimento: dataNascimento,
                telefone: telefone,
                logradouro: logradouro,
                numResidencia: numResidencia,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            });
            await novoPaciente.save();
            res.redirect('/pacientes?s=1');
            }
        }
    };

    static async detalhar(req, res) {
        const _id = req.params._id;
        const paciente = await Paciente.findOne({ _id })
        res.render('paciente/detalhar', { paciente });
    };

    static async remover(req, res) {
        const _id = req.params._id;
        const paciente = await Paciente.findOneAndDelete({ _id });
        await Consulta.deleteMany({ paciente: paciente._id });
        res.redirect('/pacientes?s=2');
    };

}
module.exports = PacienteController;