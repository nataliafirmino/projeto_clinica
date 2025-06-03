const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    dataNascimento: { type: Date },
    telefone: { type: String },
    logradouro: { type: String },
    numResidencia: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String }
});

module.exports = mongoose.model("Paciente", pacienteSchema);
