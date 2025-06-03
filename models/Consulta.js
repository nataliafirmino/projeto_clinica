const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultaSchema = new Schema({
    cod: {type: Number},
    medico: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true
    },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true
    },
    dataConsulta: {type: Date},
    status: { type: String },
    valor: {type: Number},
    horaAgendamento: { type: Date, default:Date.now }
});

module.exports = mongoose.model("Consulta", consultaSchema);