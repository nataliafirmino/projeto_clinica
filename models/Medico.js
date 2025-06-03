const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicoSchema = new Schema({
    nome: { type: String, required: true },
    crm: { type: String, required: true, unique: true },
    uf_crm: {type: String},
    especialidade: { type: String },
    telefone: { type: String },
    email: { type: String },
    status: { type: String }
});

module.exports = mongoose.model("Medico", medicoSchema);
